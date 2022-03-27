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

        [HttpGet("~/api/exerciseNames")]
        public async Task<ActionResult<IEnumerable<Exercise>>> GetExerciseNames()
        {
            var exerciseNames = await _exerciseRepository.GetExerciseNames();

            return Ok(exerciseNames);
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

        [HttpPut("~/api/workouts/{workoutId}/exercisePositions")]
        public async Task<ActionResult<IEnumerable<ExerciseDTO>>> PutPositions(long workoutId, [FromBody] List<int> positions)
        {
            var exercises = await _exerciseRepository.GetExercisesByWorkout(workoutId);

            if (positions[0] <= positions[1])
            {
                for (int i = positions[0]; i <= positions[1]; i++)
                {
                    if (i == positions[0])
                    {
                        exercises.ElementAt(i).Position = positions[1];
                    }
                    else
                    {
                        exercises.ElementAt(i).Position--;
                    }
                }
            } 
            else
            {
                for (int i = positions[0]; i >= positions[1]; i--)
                {
                    if (i == positions[0])
                    {
                        exercises.ElementAt(i).Position = positions[1];

                    }
                    else
                    {
                        exercises.ElementAt(i).Position++;
                    }
                }
            }

            foreach (var exercise in exercises)
            {
                await _exerciseRepository.Update(exercise);
            }

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult<Exercise>> PostExercise(CreateExerciseDTO exerciseDTO, long workoutId)
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

            var position = exercise.Position;

            if (exercise == null)
            {
                return NotFound();
            }

            await _exerciseRepository.Delete(exercise);

            var exercises = await _exerciseRepository.GetExercisesByWorkout(exercise.WorkoutId);

            foreach (var exe in exercises)
            {
                if (exe.Position > position)
                {
                    exe.Position--;
                    await _exerciseRepository.Update(exe);
                }
            }

            return NoContent();
        }
    }
}
