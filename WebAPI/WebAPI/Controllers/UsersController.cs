using Application.Repositories;
using AutoMapper;
using BCrypt.Net;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTO_s;

namespace WebAPI.Controllers
{
    [Authorize]
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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _userRepository.GetAll();

            var mapped = _mapper.Map<IEnumerable<CreateUserDTO>>(users);

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

            var mapped = _mapper.Map<CreateUserDTO>(user);

            return Ok(mapped);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(long id, UpdateUserDTO userDTO)
        {
            var userFromDB = await _userRepository.Get(id);

            if (userFromDB == null)
            {
                return NotFound();
            }

            _mapper.Map(userDTO, userFromDB);

            await _userRepository.Update(userFromDB);

            return Ok();
        }

        [HttpPut("~/api/users/{id}/role")]
        public async Task<IActionResult> PutUserRole(long id, [FromBody] string role)
        {
            var userFromDB = await _userRepository.Get(id);

            if (userFromDB == null)
            {
                return NotFound();
            }

            userFromDB.Role = role;

            await _userRepository.Update(userFromDB);

            return Ok();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<User>> PostUser(CreateUserDTO userDTO)
        {
            var user = _mapper.Map<User>(userDTO);

            user.Role = "user";

            user.Password = BCrypt.Net.BCrypt.EnhancedHashPassword(user.Password, HashType.SHA384);

            var userFromDb = await _userRepository.Add(user);

            return CreatedAtAction(nameof(GetUser), new { id = userFromDb.Id }, _mapper.Map<CreateUserDTO>(userFromDb));
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
    }
}
