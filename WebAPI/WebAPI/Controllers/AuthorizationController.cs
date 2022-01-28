using Application.Jwt;
using Application.Repositories;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebAPI.Controllers
{
    [Route("api/")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly IAuthorizationService _authorizationService;
        private readonly IUserRepository _userRepository;

        public AuthorizationController(IAuthorizationService authorizationService, IUserRepository userRepository)
        {
            _authorizationService = authorizationService;
            _userRepository = userRepository;
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

            var user = _userRepository.Get(request.Email);

            var claimsIdentity = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Email, request.Email),
            }, "Cookies");
            var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
            await Request.HttpContext.SignInAsync("Cookies", claimsPrincipal);

            return Ok();
        }

        [HttpPost]
        [Route("logout")]
        public async Task<ActionResult> Logout()
        {
            try
            {
                await HttpContext.SignOutAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }
    }
}
