using Application.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Application.Jwt
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

        public async Task Invoke(HttpContext context, IUserRepository userRepository, IJwtUtils jwtUtils)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            var userId = jwtUtils.ValidateJwtToken(token);

            if (userId != null)
            {
                context.Items["User"] = userRepository.Get((long)userId);
            }

            await _next(context);
        }
    }
}
