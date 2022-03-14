using Application.Repositories;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTO_s;

namespace WebAPI.Controllers
{
    [Authorize]
    [Route("api/ratings")]
    [ApiController]
    public class RatingsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IRatingRepository _ratingRepository;

        public RatingsController(IRatingRepository ratingRepository, IMapper mapper)
        {
            _ratingRepository = ratingRepository;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProgramRating>> GetRating(long id)
        {
            var rating = await _ratingRepository.GetAverage(id);

            if (double.IsNaN(rating))
            {
                return NotFound();
            }

            return Ok(rating);
        }

        [HttpGet("/api/myRatings")]
        public async Task<ActionResult<ProgramRating>> GetMyRating(long userId, long programId)
        {
            var myRating = await _ratingRepository.GetMyRating(userId, programId);

            return Ok(myRating);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutRating(long id, UpdateRatingDTO rating)
        {
            var ratingFromDB = await _ratingRepository.Get(id);

            if (ratingFromDB == null)
            {
                return NotFound();
            }

            _mapper.Map(rating, ratingFromDB);

            var updatedRating = await _ratingRepository.Update(ratingFromDB);

            return Ok(_mapper.Map<UpdateRatingDTO>(updatedRating));
        }

        [HttpPost]
        public async Task<ActionResult<ProgramRating>> PostRating(CreateRatingDTO ratingDTO)
        {
            var rating = _mapper.Map<ProgramRating>(ratingDTO);

            await _ratingRepository.Add(rating);

            return Ok();
            //return CreatedAtAction(nameof(GetExercise), new { workoutId, id = exerciseFromDb.Id }, _mapper.Map<ExerciseDTO>(exerciseFromDb));
        }

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteExercise(long id)
        //{
        //    var exercise = await _exerciseRepository.Get(id);

        //    if (exercise == null)
        //    {
        //        return NotFound();
        //    }

        //    await _exerciseRepository.Delete(exercise);

        //    return NoContent();
        //}
    }
}
