using Application.Repositories;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTO_s;

namespace WebAPI.Controllers
{
    [Authorize]
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

        [HttpPut("~/api/programs/{programId}/workoutPositions")]
        public async Task<ActionResult<IEnumerable<UpdateWorkoutNameDTO>>> PutPositions(long programId, [FromBody] List<int> positions)
        {
            var workouts = await _workoutRepository.GetWorkoutsByProgram(programId);

            if (positions[0] <= positions[1])
            {
                for (int i = positions[0]; i <= positions[1]; i++)
                {
                    if (i == positions[0])
                    {
                        workouts.ElementAt(i).Position = positions[1];
                    }
                    else
                    {
                        workouts.ElementAt(i).Position--;
                    }
                }
            }
            else
            {
                for (int i = positions[0]; i >= positions[1]; i--)
                {
                    if (i == positions[0])
                    {
                        workouts.ElementAt(i).Position = positions[1];

                    }
                    else
                    {
                        workouts.ElementAt(i).Position++;
                    }
                }
            }

            foreach (var workout in workouts)
            {
                await _workoutRepository.Update(workout);
            }

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult<WorkoutDay>> PostWorkout(long programId, CreateWorkoutDayDTO workoutDTO)
        {
            var workout = _mapper.Map<WorkoutDay>(workoutDTO);

            workout.ProgramId = programId;

            var workoutFromDb = await _workoutRepository.Add(workout);

            return CreatedAtAction("GetWorkout", new { programId, id = workoutFromDb.Id }, _mapper.Map<WorkoutDayDTO>(workoutFromDb));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkout(long id)
        {
            var workout = await _workoutRepository.Get(id);

            var position = workout.Position;

            if (workout == null)
            {
                return NotFound();
            }

            await _workoutRepository.Delete(workout);

            var workouts = await _workoutRepository.GetWorkoutsByProgram(workout.ProgramId);

            foreach (var work in workouts)
            {
                if (work.Position > position)
                {
                    work.Position--;
                    await _workoutRepository.Update(work);
                }
            }

            return NoContent();
        }
    }
}
