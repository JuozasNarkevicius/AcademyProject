using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Application.Repositories;
using Domain.Entities;
using WebAPI.DTO_s;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    [Authorize]
    [Route("api/applications")]
    [ApiController]
    public class TrainerApplicationsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ITrainerApplicationRepository _applicationRepository;
        private readonly IRatingRepository _ratingRepository;

        public TrainerApplicationsController(ITrainerApplicationRepository applicationRepository, IRatingRepository ratingRepository, IMapper mapper)
        {
            _applicationRepository = applicationRepository;
            _ratingRepository = ratingRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TrainerApplication>>> GetApplications()
        {
            var applications = await _applicationRepository.GetAll();

            var mapped = _mapper.Map<IEnumerable<TrainerApplicationDTO>>(applications);

            return Ok(mapped);
        }
        [HttpPut("~/api/applications/{id}/status")]
        public async Task<IActionResult> PutUserRole(long id, [FromBody] string status)
        {
            var applicationFromDB = await _applicationRepository.Get(id);

            if (applicationFromDB == null)
            {
                return NotFound();
            }

            applicationFromDB.Status = status;

            await _applicationRepository.Update(applicationFromDB);

            return Ok();
        }

        [HttpGet("~/api/verifiedApplications/")]
        public async Task<ActionResult<IEnumerable<TrainerApplication>>> GetVerifiedApplications()
        {
            var applications = await _applicationRepository.GetAllVerified();

            var mapped = _mapper.Map<IEnumerable<TrainerApplicationDTO>>(applications);

            return Ok(mapped);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TrainerApplication>> GetApplication(long id, bool isUserId)
        {
            TrainerApplication application;
            if(isUserId)
            {
                application = await _applicationRepository.GetByUserId(id);
            } 
            else
            {
                application = await _applicationRepository.Get(id);
            }

            var rating = await _ratingRepository.GetAverage(id, "trainers");

            //if (application == null)
            //{
            //    return NotFound();
            //}

            var mapped = _mapper.Map<TrainerApplicationDTO>(application);

            mapped.Rating = rating;

            return Ok(mapped);
        }

        [HttpPost]
        public async Task<ActionResult<TrainerApplication>> PostApplication(CreateTrainerApplicationDTO applicationDTO)
        {
            var application = _mapper.Map<TrainerApplication>(applicationDTO);

            application.Status = "pending";

            var applicationFromDb = await _applicationRepository.Add(application);

            return CreatedAtAction(nameof(GetApplication), new { id = applicationFromDb.Id }, _mapper.Map<TrainerApplicationDTO>(applicationFromDb));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TrainerApplication>> PutApplication(long id, UpdateTrainerApplicationDTO applicationDTO)
        {
            var applicationFromDB = await _applicationRepository.Get(id);

            if (applicationFromDB == null)
            {
                return NotFound();
            }

            _mapper.Map(applicationDTO, applicationFromDB);

            var updatedApplication = await _applicationRepository.Update(applicationFromDB);

            return Ok(_mapper.Map<TrainerApplicationDTO>(updatedApplication));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApplication(long id)
        {
            var application = await _applicationRepository.Get(id);

            if (application == null)
            {
                return NotFound();
            }

            await _applicationRepository.Delete(application);

            return NoContent();
        }
    }
}
