using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using WebAPI.Data.Repositories;
using WebAPI.Data.Entities;
using WebAPI.Data.DTO_s;

namespace WebAPI.Controllers
{
    [Route("api/workouts/{workoutId}/[Controller]")]
    [ApiController]
    public class ExercisesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IExerciseRepository _exerciseRepository;

        public ExercisesController(IExerciseRepository exerciseRepository, IMapper mapper)
        {
            _exerciseRepository = exerciseRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Exercise>>> GetExercises()
        {
            var exercises = await _exerciseRepository.GetAll();

            var mapped = _mapper.Map<IEnumerable<ExerciseDTO>>(exercises);

            return Ok(mapped);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Exercise>> GetExercise(long id)
        {
            var exercise = await _exerciseRepository.Get(id);

            if (exercise == null)
            {
                return NotFound();
            }

            var mapped = _mapper.Map<ExerciseDTO>(exercise);

            return Ok(mapped);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutExercise(long id, Exercise exercise)
        {
            if (id != exercise.Id)
            {
                return BadRequest();
            }
            if (_exerciseRepository.Get(id) == null)
            {
                return NotFound();
            }

            var updatedExercise = await _exerciseRepository.Update(exercise);

            return Ok(updatedExercise);
        }

        [HttpPost]
        public async Task<ActionResult<Exercise>> PostExercise(ExerciseDTO exerciseDTO, long workoutId)
        {
            var exercise = _mapper.Map<Exercise>(exerciseDTO);

            exercise.WorkoutId = workoutId;

            var exerciseFromDb = await _exerciseRepository.Add(exercise); 

            return CreatedAtAction(nameof(GetExercise), new { id = exerciseFromDb.Id }, _mapper.Map<ExerciseDTO>(exerciseFromDb));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExercise(long id)
        {
            var exercise = await _exerciseRepository.Get(id);

            if (exercise == null)
            {
                return NotFound();
            }

            await _exerciseRepository.Delete(exercise);

            return NoContent();
        }
    }
}
