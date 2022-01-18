using Application.Jwt;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly IAuthorizationService _authorizationService;

        public AuthorizationController(IAuthorizationService authorizationService)
        {
            _authorizationService = authorizationService;
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<AuthenticateResponse>> Login(AuthenticateRequest request)
        {
            var isVerified = await _authorizationService.VerifyPassword(request);

            if (!isVerified)
            {
                return Unauthorized();
            }

            var jwtToken = await _authorizationService.GenerateJwtToken(request.Email);

            return Ok(new AuthenticateResponse(jwtToken));
        }

        private void setTokenCookie(string token)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append("refreshToken", token, cookieOptions);
        }
    }
}
