using Application.Repositories;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkoutProgram>>> GetPrograms(long userId)
        {
            var programs = await _workoutProgramRepository.GetAll(userId);

            var mapped = _mapper.Map<IEnumerable<WorkoutProgramNamesDTO>>(programs);

            return Ok(mapped);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WorkoutProgram>> GetProgram(long id, long userId)
        {
            var program = await _workoutProgramRepository.Get(id, userId);

            if (program == null)
            {
                return NotFound();
            }

            var mapped = _mapper.Map<WorkoutProgramDTO>(program);

            return Ok(mapped);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<WorkoutProgramNamesDTO>> UpdateProgram(long id, UpdateProgramNameDTO program)
        {
            var programFromDB = await _workoutProgramRepository.GetProgramName(id);

            if (programFromDB == null)
            {
                return NotFound();
            }

            _mapper.Map(program, programFromDB);

            var updatedProgram = await _workoutProgramRepository.Update(programFromDB);

            return Ok(_mapper.Map<UpdateProgramNameDTO>(updatedProgram));
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
