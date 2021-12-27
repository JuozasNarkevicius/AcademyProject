using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI.Data.Entities;
using WebAPI.Data.Models;

namespace WebAPI.Data.Repositories
{
    public interface IUserRepository
    {
        public Task<IEnumerable<User>> GetAll();
        public Task<User> Get(long id);
        public Task<User> Update(User user);
        public Task<User> Add(User user);
        public Task Delete(User user);
        public AuthenticateResponse Authenticate(AuthenticateRequest model);

    }
    public class UserRepository : IUserRepository
    {
        private readonly WebContext _context;
        private readonly JwtConfig _config;
        public UserRepository(WebContext context, IOptions<JwtConfig> config)
        {
            _context = context;
            _config = config.Value;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = _context.Users.SingleOrDefault(x => x.Email == model.Email && x.Password == model.Password);

            if (user == null)
            {
                return null;
            }

            var token = GenerateJwtToken(user);

            return new AuthenticateResponse(user, token);
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

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
