using Application.Repositories;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTO_s;

namespace WebAPI.Controllers
{
    [Route("api/programs/{programId}/workouts")]
    [ApiController]
    public class WorkoutDaysController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IWorkoutDayRepository _workoutRepository;

        public WorkoutDaysController(IWorkoutDayRepository workoutRepository, IMapper mapper)
        {
            _workoutRepository = workoutRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkoutDay>>> GetWorkouts()
        {
            var workouts = await _workoutRepository.GetAll();

            var mapped = _mapper.Map<IEnumerable<WorkoutDayDTO>>(workouts);

            return Ok(mapped);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WorkoutDay>> GetWorkout(long id)
        {
            var workout = await _workoutRepository.Get(id);

            if (workout == null)
            {
                return NotFound();
            }

            var mapped = _mapper.Map<WorkoutDayDTO>(workout);

            return Ok(mapped);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkout(long id, UpdateWorkoutNameDTO workout)
        {
            var workoutFromDB = await _workoutRepository.GetWorkoutName(id);

            if (workoutFromDB == null)
            {
                return NotFound();
            }

            _mapper.Map(workout, workoutFromDB);

            var updatedWorkout = await _workoutRepository.Update(workoutFromDB);

            return Ok(_mapper.Map<UpdateWorkoutNameDTO>(updatedWorkout));
        }

        [HttpPost]
        public async Task<ActionResult<WorkoutDay>> PostWorkout(long programId, CreateWorkoutDayDTO workoutDTO)
        {
            var workout = _mapper.Map<WorkoutDay>(workoutDTO);

            workout.ProgramId = programId;

            var workoutFromDb = await _workoutRepository.Add(workout);

            Console.WriteLine(workoutFromDb.Id);

            return CreatedAtAction("GetWorkout", new { programId, id = workoutFromDb.Id }, _mapper.Map<WorkoutDayDTO>(workoutFromDb));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkout(long id)
        {
            var workout = await _workoutRepository.Get(id);

            if (workout == null)
            {
                return NotFound();
            }

            await _workoutRepository.Delete(workout);

            return NoContent();
        }
    }
}
