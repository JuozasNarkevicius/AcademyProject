using Application.Repositories;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTO_s;

namespace WebAPI.Controllers
{
    [Route("api/users/{userId}/programs")]
    [ApiController]
    public class WorkoutProgramsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IWorkoutProgramRepository _workoutProgramRepository;
        private readonly IWorkoutDayRepository _workoutDayRepository;
        private readonly IExerciseRepository _exerciseRepository;

        public WorkoutProgramsController(IWorkoutProgramRepository workoutProgramRepository, IWorkoutDayRepository workoutDayRepository, IExerciseRepository exerciseRepository, IMapper mapper)
        {
            _workoutProgramRepository = workoutProgramRepository;
            _workoutDayRepository = workoutDayRepository;
            _exerciseRepository = exerciseRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkoutProgram>>> GetPrograms()
        {
            var programs = await _workoutProgramRepository.GetAll();

            var mapped = _mapper.Map<IEnumerable<WorkoutProgramDTO>>(programs);

            return Ok(mapped);
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

        [HttpPost]
        public async Task<ActionResult<WorkoutProgram>> PostProgram(long userId, CreateWorkoutProgramDTO programDTO)
        {
            var program = _mapper.Map<WorkoutProgram>(programDTO);
            program.UserId = userId;
            var programFromDb = await _workoutProgramRepository.Add(program);

            foreach (var workoutDTO in programDTO.Workouts)
            {
                var workout = _mapper.Map<WorkoutDay>(workoutDTO);
                workout.ProgramId = programFromDb.Id;
                var workoutFromDb = await _workoutDayRepository.Add(workout);

                foreach (var exerciseDTO in workoutDTO.Exercises)
                {
                    var exercise = _mapper.Map<Exercise>(exerciseDTO);
                    exercise.WorkoutId = workoutFromDb.Id;
                    await _exerciseRepository.Add(exercise);
                }
            }
            return CreatedAtAction(nameof(GetProgram), new { userId, id = programFromDb.Id }, _mapper.Map<WorkoutProgramDTO>(programFromDb));
        }
    }
}
