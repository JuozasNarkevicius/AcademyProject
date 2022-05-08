using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Repositories;
using BCrypt.Net;

namespace Application.Jwt
{
    public interface IAuthorizationService
    {
        public Task<bool> VerifyPassword(AuthenticateRequest request);
        //public Task<string> GenerateJwtToken(string email);
    }

    public class AuthorizationService : IAuthorizationService
    {
        private readonly JwtConfig _config;
        private readonly IUserRepository _userRepository;

        public AuthorizationService(IOptions<JwtConfig> config, IUserRepository userRepository)
        {
            _config = config.Value;
            _userRepository = userRepository;
        }

        public async Task<bool> VerifyPassword(AuthenticateRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            {
                return false;
            }

            var user = await _userRepository.Get(request.Email);

            if (user == null)
            {
                return false;
            }

            return BCrypt.Net.BCrypt.EnhancedVerify(request.Password, user.Password, hashType: HashType.SHA384);
        }

        //public async Task<string> GenerateJwtToken(string email)
        //{
        //    var user = await _userRepository.Get(email);
        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    var key = Encoding.ASCII.GetBytes(_config.Secret);
        //    var tokenDescriptor = new SecurityTokenDescriptor
        //    {
        //        Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
        //        Expires = DateTime.UtcNow.AddMinutes(15),
        //        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        //    };
        //    var token = tokenHandler.CreateToken(tokenDescriptor);
        //    return tokenHandler.WriteToken(token);
        //}
    }
}
