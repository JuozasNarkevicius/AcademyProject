using Application.Jwt;
using Application.Repositories;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTO_s;

namespace WebAPI.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _userRepository.GetAll();

            var mapped = _mapper.Map<IEnumerable<UserDTO>>(users);

            return Ok(mapped);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(long id)
        {
            var user = await _userRepository.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            var mapped = _mapper.Map<UserDTO>(user);

            return Ok(mapped);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(long id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            if (_userRepository.Get(id) == null)
            {
                return NotFound();
            }

            var updatedUser = await _userRepository.Update(user);

            return Ok(updatedUser);
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser(UserDTO userDTO)
        {
            var user = _mapper.Map<User>(userDTO);

            var userFromDb = await _userRepository.Add(user);

            return CreatedAtAction(nameof(GetUser), new { id = userFromDb.Id }, _mapper.Map<UserDTO>(userFromDb));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(long id)
        {
            var user = await _userRepository.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            await _userRepository.Delete(user);

            return NoContent();
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _userRepository.Authenticate(model, ipAddress());
            setTokenCookie(response.RefreshToken);
            return Ok(response);
        }

        [HttpPost("refresh-token")]
        public IActionResult RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            var response = _userRepository.RefreshToken(refreshToken, ipAddress());
            setTokenCookie(response.RefreshToken);
            return Ok(response);
        }

        [HttpPost("revoke-token")]
        public IActionResult RevokeToken(RevokeTokenRequest model)
        {
            var token = model.Token ?? Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(token))
                return BadRequest(new { message = "Token is required" });

            _userRepository.RevokeToken(token, ipAddress());
            return Ok(new { message = "Token revoked" });
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

        private string ipAddress()
        {
            if (Request.Headers.ContainsKey("X-Forwarded-For"))
                return Request.Headers["X-Forwarded-For"];
            else
                return HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
        }
    }
}
