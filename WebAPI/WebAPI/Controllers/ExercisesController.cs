using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Application.Repositories;
using Domain.Entities;
using WebAPI.DTO_s;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    [Authorize]
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

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Exercise>>> GetExercises()
        //{
        //    var exercises = await _exerciseRepository.GetAll();

        //    var mapped = _mapper.Map<IEnumerable<ExerciseDTO>>(exercises);

        //    return Ok(mapped);
        //}

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
        public async Task<IActionResult> PutExercise(long id, UpdateExerciseDTO exercise)
        {
            var exerciseFromDB = await _exerciseRepository.Get(id);

            if (exerciseFromDB == null)
            {
                return NotFound();
            }

            _mapper.Map(exercise, exerciseFromDB);

            var updatedExercise = await _exerciseRepository.Update(exerciseFromDB);

            return Ok(_mapper.Map<ExerciseDTO>(updatedExercise));
        }

        [HttpPost]
        public async Task<ActionResult<Exercise>> PostExercise(UpdateExerciseDTO exerciseDTO, long workoutId)
        {
            var exercise = _mapper.Map<Exercise>(exerciseDTO);

            exercise.WorkoutId = workoutId;

            var exerciseFromDb = await _exerciseRepository.Add(exercise); 

            return CreatedAtAction(nameof(GetExercise), new { workoutId, id = exerciseFromDb.Id }, _mapper.Map<ExerciseDTO>(exerciseFromDb));
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
