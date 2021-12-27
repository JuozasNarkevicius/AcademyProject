using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using WebAPI.Data.Repositories;

namespace WebAPI.Data
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly JwtConfig _config;

        public JwtMiddleware(RequestDelegate next, IOptions<JwtConfig> config)
        {
            _next = next;
            _config = config.Value;
        }

        public async Task Invoke(HttpContext context, IUserRepository userRepository)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token == null)
            {
                attachUserToContext(context, userRepository, token);
            }

            await _next(context);
        }

        private void attachUserToContext(HttpContext context, IUserRepository userRepository, string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_config.Secret);
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);
                context.Items["User"] = userRepository.Get(userId);
            }
            catch
            {

            }
        }
    }
}
