using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Repositories;
using WebAPI.DTO_s;

namespace WebAPI.Controllers
{
    [Route("api/programs")]
    [ApiController]
    public class WorkoutProgramsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IWorkoutProgramRepository _workoutProgramRepository;

        public WorkoutProgramsController(IWorkoutProgramRepository workoutProgramRepository, IMapper mapper)
        {
            _workoutProgramRepository = workoutProgramRepository;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WorkoutProgram>> GetProgram(long id)
        {
            var program = await _workoutProgramRepository.Get(id);

            if (program == null)
            {
                return NotFound();
            }

            var mapped = _mapper.Map<WorkoutProgramDTO>(program);

            return Ok(mapped);
        }
    }
}
