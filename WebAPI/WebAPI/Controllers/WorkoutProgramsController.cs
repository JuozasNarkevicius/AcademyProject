using Application.Repositories;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTO_s;

namespace WebAPI.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/programs")]
    [ApiController]
    public class WorkoutProgramsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IWorkoutProgramRepository _workoutProgramRepository;
        private readonly IRatingRepository _ratingRepository;
        private readonly IWorkoutDayRepository _workoutDayRepository;
        private readonly IExerciseRepository _exerciseRepository;

        public WorkoutProgramsController(IWorkoutProgramRepository workoutProgramRepository, IWorkoutDayRepository workoutDayRepository, IExerciseRepository exerciseRepository, IRatingRepository ratingRepository, IMapper mapper)
        {
            _workoutProgramRepository = workoutProgramRepository;
            _workoutDayRepository = workoutDayRepository;
            _exerciseRepository = exerciseRepository;
            _ratingRepository = ratingRepository;
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

        [Authorize]
        [HttpGet("public")]
        public async Task<ActionResult<IEnumerable<WorkoutProgram>>> GetPublicPrograms()
        {
            var programs = await _workoutProgramRepository.GetAllPublic();

            var mapped = _mapper.Map<IEnumerable<WorkoutProgramNamesDTO>>(programs);

            return Ok(mapped);
        }

        [HttpGet("/api/programs/{id}")]
        public async Task<ActionResult<WorkoutProgram>> GetProgram(long id)
        {
            var program = await _workoutProgramRepository.Get(id);

            var rating = await _ratingRepository.GetAverage(id);

            if (program == null)
            {
                return NotFound();
            }

            var mapped = _mapper.Map<WorkoutProgramDTO>(program);

            mapped.Rating = rating;

            return Ok(mapped);
        }

        [HttpGet("{id}/name")]
        public async Task<ActionResult<WorkoutProgram>> GetProgramName(long id)
        {
            var program = await _workoutProgramRepository.GetName(id);

            if (program == null)
            {
                return NotFound();
            }

            var mapped = _mapper.Map<UpdateProgramNameDTO>(program);

            return Ok(mapped);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<WorkoutProgramNamesDTO>> UpdateProgram(long id, UpdateProgramNameDTO program)
        {
            var programFromDB = await _workoutProgramRepository.Get(id);

            if (programFromDB == null)
            {
                return NotFound();
            }

            _mapper.Map(program, programFromDB);

            var updatedProgram = await _workoutProgramRepository.Update(programFromDB);

            return Ok(_mapper.Map<UpdateProgramNameDTO>(updatedProgram));
        }

        [HttpPost]
        [Route("name")]
        public async Task<ActionResult<UpdateProgramNameDTO>> PostProgramName(long userId, UpdateProgramNameDTO programDTO)
        {
            var program = _mapper.Map<WorkoutProgram>(programDTO);

            program.UserId = userId;
            var programFromDB = await _workoutProgramRepository.Add(program);

            return CreatedAtAction("GetProgramName", new { userId, id = programFromDB.Id }, _mapper.Map<WorkoutProgramNamesDTO>(programFromDB));
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProgram(long id)
        {
            var program = await _workoutProgramRepository.Get(id);

            if (program == null)
            {
                return NotFound();
            }

            await _workoutProgramRepository.Delete(program);

            return NoContent();
        }
    }
}
