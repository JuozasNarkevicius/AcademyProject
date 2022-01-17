using Application.DatabaseContext;
using Application.Jwt;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Application.Repositories
{
    public interface IUserRepository
    {
        public Task<IEnumerable<User>> GetAll();
        public Task<User> Get(long id);
        public Task<User> Update(User user);
        public Task<User> Add(User user);
        public Task Delete(User user);
        public AuthenticateResponse Authenticate(AuthenticateRequest model, string ipAddress);
        public AuthenticateResponse RefreshToken(string token, string ipAddress);
        public void RevokeToken(string token, string ipAddress);

    }
    public class UserRepository : IUserRepository
    {
        private readonly WebContext _context;
        private readonly JwtConfig _config;
        private IJwtUtils _jwtUtils;
        public UserRepository(WebContext context, IOptions<JwtConfig> config, IJwtUtils jwtUtils)
        {
            _context = context;
            _config = config.Value;
            _jwtUtils = jwtUtils;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model, string ipAddress)
        {
            var user = _context.Users.SingleOrDefault(x => x.Email == model.Email);

            var jwtToken = _jwtUtils.GenerateJwtToken(user);
            var refreshToken = _jwtUtils.GenerateRefreshToken(ipAddress);
            user.RefreshTokens.Add(refreshToken);

            removeOldRefreshTokens(user);

            _context.Update(user);
            _context.SaveChanges();

            return new AuthenticateResponse(user, jwtToken, refreshToken.Token);
        }

        public AuthenticateResponse RefreshToken(string token, string ipAddress)
        {
            var user = getUserByRefreshToken(token);
            var refreshToken = user.RefreshTokens.Single(x => x.Token == token);

            if (refreshToken.IsRevoked)
            {
                revokeDescendantRefreshTokens(refreshToken, user, ipAddress, $"Attempted reuse of revoked ancestor token: {token}");
                _context.Update(user);
                _context.SaveChanges();
            }

            var newRefreshToken = rotateRefreshToken(refreshToken, ipAddress);
            user.RefreshTokens.Add(newRefreshToken);

            removeOldRefreshTokens(user);

            _context.Update(user);
            _context.SaveChanges();

            var jwtToken = _jwtUtils.GenerateJwtToken(user);

            return new AuthenticateResponse(user, jwtToken, newRefreshToken.Token);
        }

        public void RevokeToken(string token, string ipAddress)
        {
            var user = getUserByRefreshToken(token);
            var refreshToken = user.RefreshTokens.Single(x => x.Token == token);

            revokeRefreshToken(refreshToken, ipAddress, "Revoked without replacement");
            _context.Update(user);
            _context.SaveChanges();
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            var users = await _context.Users.ToListAsync();

            return users;
        }
        public async Task<User> Get(long id)
        {
            var user = await _context.Users.FindAsync(id);

            return user;
        }
        public async Task<User> Update(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return await Get(user.Id);
        }
        public async Task<User> Add(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return await Get(user.Id);
        }
        public async Task Delete(User user)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

        private void removeOldRefreshTokens(User user)
        {
            user.RefreshTokens.RemoveAll(x =>
                !x.IsActive &&
                x.Created.AddDays(_config.RefreshTokenTTL) <= DateTime.UtcNow);
        }

        private User getUserByRefreshToken(string token)
        {
            var user = _context.Users.SingleOrDefault(u => u.RefreshTokens.Any(t => t.Token == token));

            return user;
        }

        private RefreshToken rotateRefreshToken(RefreshToken refreshToken, string ipAddress)
        {
            var newRefreshToken = _jwtUtils.GenerateRefreshToken(ipAddress);
            revokeRefreshToken(refreshToken, ipAddress, "Replaced by new token", newRefreshToken.Token);
            return newRefreshToken;
        }

        private void revokeDescendantRefreshTokens(RefreshToken refreshToken, User user, string ipAddress, string reason)
        {
            if (!string.IsNullOrEmpty(refreshToken.ReplacedByToken))
            {
                var childToken = user.RefreshTokens.SingleOrDefault(x => x.Token == refreshToken.ReplacedByToken);
                if (childToken.IsActive)
                    revokeRefreshToken(childToken, ipAddress, reason);
                else
                    revokeDescendantRefreshTokens(childToken, user, ipAddress, reason);
            }
        }

        private void revokeRefreshToken(RefreshToken token, string ipAddress, string reason = null, string replacedByToken = null)
        {
            token.Revoked = DateTime.UtcNow;
            token.RevokedByIp = ipAddress;
            token.ReasonRevoked = reason;
            token.ReplacedByToken = replacedByToken;
        }
    }
}
