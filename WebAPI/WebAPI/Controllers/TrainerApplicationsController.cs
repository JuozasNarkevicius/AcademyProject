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

        public TrainerApplicationsController(ITrainerApplicationRepository applicationRepository, IMapper mapper)
        {
            _applicationRepository = applicationRepository;
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
        public async Task<ActionResult<TrainerApplication>> GetApplication(long id)
        {
            var application = await _applicationRepository.Get(id);

            if (application == null)
            {
                return NotFound();
            }

            var mapped = _mapper.Map<TrainerApplicationDTO>(application);

            return Ok(mapped);
        }

        [HttpPost]
        public async Task<ActionResult<TrainerApplication>> PostApplication(CreateTrainerApplicationDTO applicationDTO)
        {
            var application = _mapper.Map<TrainerApplication>(applicationDTO);

            var applicationFromDb = await _applicationRepository.Add(application);

            return CreatedAtAction(nameof(GetApplication), new { id = applicationFromDb.Id }, _mapper.Map<TrainerApplicationDTO>(applicationFromDb));
        }
    }
}
