using Application.Repositories;
using AutoMapper;
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
        [AllowAnonymous]
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
    }
}
