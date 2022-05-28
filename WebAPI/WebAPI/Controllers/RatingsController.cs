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

        [HttpGet("/{item}/{id}")]
        public async Task<ActionResult<Rating>> GetRating(long id, string item)
        {
            var rating = await _ratingRepository.GetAverage(id, item);

            if (double.IsNaN(rating))
            {
                return NotFound();
            }

            return Ok(rating);
        }

        [HttpGet("/api/user/{userId}/{item}/{itemId}/myRating")]
        public async Task<ActionResult<Rating>> GetMyRating(long userId, string item, long itemId)
        {
            var myRating = await _ratingRepository.GetMyRating(userId, item, itemId);

            return Ok(myRating);
        }

        [HttpGet("~/api/{item}/{itemId}/ratingsCount")]
        public async Task<ActionResult<int>> RatingsCount(string item, long itemId)
        {
            var ratingsCount = await _ratingRepository.GetRatingsCount(item, itemId);

            return Ok(ratingsCount);
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
        public async Task<ActionResult<Rating>> PostRating(CreateRatingDTO ratingDTO)
        {
            var rating = _mapper.Map<Rating>(ratingDTO);

            await _ratingRepository.Add(rating);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRating(long id)
        {
            var rating = await _ratingRepository.Get(id);

            if (rating == null)
            {
                return NotFound();
            }

            await _ratingRepository.Delete(rating);

            return NoContent();
        }
    }
}
