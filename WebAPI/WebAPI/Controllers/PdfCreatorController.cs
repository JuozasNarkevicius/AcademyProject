using DinkToPdf.Contracts;
using Microsoft.AspNetCore.Mvc;
using Application.Repositories;
using EmailService;
using WebAPI.Services;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    [Authorize]
    [Route("api/pdf")]
    [ApiController]
    public class PdfCreatorController : ControllerBase
    {
        private readonly IConverter _converter;
        private readonly IWorkoutProgramRepository _workoutProgramRepository;
        private readonly IEmailSender _emailSender;
        private readonly IPdfCreator _pdfCreator;
        public PdfCreatorController(IConverter converter, IWorkoutProgramRepository workoutProgramRepository, IEmailSender emailSender, IPdfCreator pdfCreator)
        {
            _converter = converter;
            _workoutProgramRepository = workoutProgramRepository;
            _emailSender = emailSender;
            _pdfCreator = pdfCreator;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> CreatePDF(long Id)
        {
            var program = await _workoutProgramRepository.Get(Id);
            var file = _pdfCreator.CreatePdf(program, _converter);

            return File(file, "application/pdf");
        }

        [HttpGet("~/api/email/{email}/program/{programId}")]
        public async Task<IActionResult> CreatePDFAndSendToEmail(string Email, long programId)
        {
            var program = await _workoutProgramRepository.Get(programId);
            var file = _pdfCreator.CreatePdf(program, _converter);
            var stream = new MemoryStream(file);
            IFormFile newFile = new FormFile(stream, 0, file.Length, program.Name, program.Name);

            var message = new Message(Email, "Your program PDF", "You will find your program pdf attached to this email.Have a nice day!", newFile);
            _emailSender.SendEmail(message);

            return Ok();
        }
    }
}
