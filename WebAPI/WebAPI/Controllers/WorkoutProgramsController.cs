using Application.Repositories;
using AutoMapper;
using Domain.Entities;
using EmailService;
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

        public WorkoutProgramsController(IWorkoutProgramRepository workoutProgramRepository, IRatingRepository ratingRepository, IMapper mapper)
        {
            _workoutProgramRepository = workoutProgramRepository;
            _ratingRepository = ratingRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkoutProgram>>> GetPrograms(long userId)
        {
            var programs = await _workoutProgramRepository.GetAll(userId);

            var mapped = _mapper.Map<IEnumerable<WorkoutProgramNamesDTO>>(programs);

            return Ok(mapped);
        }

        [HttpGet("~/api/users/{userId}/savedPrograms/")]
        public async Task<ActionResult<IEnumerable<WorkoutProgram>>> GetSavedPrograms(long userId)
        {
            var savedPrograms = await _workoutProgramRepository.GetAllSaved(userId);

            var mapped = _mapper.Map<IEnumerable<WorkoutProgramNamesDTO>>(savedPrograms);

            return Ok(mapped);
        }

        [HttpPost]
        [Route("~/api/users/{userId}/savedPrograms/")]
        public async Task<ActionResult<UpdateProgramNameDTO>> SaveProgram(CreateSavedProgramDTO programDTO, long userId)
        {
            var program = _mapper.Map<SavedProgram>(programDTO);

            program.UserId = userId;

            var programFromDB = await _workoutProgramRepository.SaveProgram(program);

            var savedProgram = _mapper.Map<CreateSavedProgramDTO>(programFromDB);

            return Ok(savedProgram);
        }

        [HttpGet]
        [Route("~/api/users/{userId}/programs/{programId}/isSaved")]
        public async Task<ActionResult<UpdateProgramNameDTO>> IsSaved(long userId, long programId)
        {
            var isSaved = await _workoutProgramRepository.IsSaved(userId, programId);

            return Ok(isSaved);
        }

        [Authorize]
        [HttpGet("~/api/users/{userId}/publicPrograms/")]
        public async Task<ActionResult<IEnumerable<WorkoutProgram>>> GetPublicPrograms(long userId)
        {
            var programs = await _workoutProgramRepository.GetAllPublic(userId);

            var mapped = _mapper.Map<IEnumerable<WorkoutProgramNamesDTO>>(programs);

            foreach (var program in mapped)
            {
                program.Rating = await _ratingRepository.GetAverage(program.Id, "programs");
            }

            return Ok(mapped);
        }

        [HttpGet("/api/programs/{id}")]
        public async Task<ActionResult<WorkoutProgram>> GetProgram(long id)
        {
            var program = await _workoutProgramRepository.Get(id);

            var rating = await _ratingRepository.GetAverage(id, "programs");

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
        public async Task<ActionResult<UpdateProgramNameDTO>> PostProgramName(long userId, UpdateProgramNameDTO programDTO)
        {
            var program = _mapper.Map<WorkoutProgram>(programDTO);

            program.UserId = userId;
            var programFromDB = await _workoutProgramRepository.Add(program);

            return CreatedAtAction("GetProgramName", new { userId, id = programFromDB.Id }, _mapper.Map<WorkoutProgramNamesDTO>(programFromDB));
        }

        [HttpDelete("~/api/users/{userId}/savedPrograms/{programId}")]
        public async Task<IActionResult> DeleteSavedProgram(long userId, long programId)
        {
            var savedProgram = await _workoutProgramRepository.GetSaved(userId, programId);

            if (savedProgram == null)
            {
                return NotFound();
            }

            await _workoutProgramRepository.DeleteSavedProgram(savedProgram);

            return NoContent();
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
