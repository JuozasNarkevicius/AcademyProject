using Application.Repositories;
using DinkToPdf.Contracts;
using Domain.Entities;
using EmailService;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAPI.Controllers;
using WebAPI.Services;
using Xunit;

namespace Tests
{
    public class PdfCreatorControllerUnitTests
    {
        private readonly PdfCreatorController controller;
        private readonly Mock<IWorkoutProgramRepository> programRepository;
        private readonly Mock<IConverter> converter;
        

        public PdfCreatorControllerUnitTests()
        {
            var mockEmailSender = new Mock<IEmailSender>();
            var mockPdfCreator = new Mock<IPdfCreator>();
            programRepository = new Mock<IWorkoutProgramRepository>();
            converter = new Mock<IConverter>();
            controller = new PdfCreatorController(converter.Object, programRepository.Object, mockEmailSender.Object, mockPdfCreator.Object);
        }

        [Fact]
        public async void CreatePDF_ReturnsFileResponseWithCreatedFile()
        {
            var programId = 13;
            var exercise = new Exercise
            {
                Name = "Exercise",
                Sets = 4,
                Reps = "12, 12, 12, 12",
                Rest = 60,
            };

            var workout = new WorkoutDay
            {
                Name = "Workout",
                Exercises = new List<Exercise>(),
            };

            var program = new WorkoutProgram
            {
                Id = programId,
                Name = "Program",
                Workouts = new List<WorkoutDay>(),
            };

            for (int i = 0; i < 4; i++)
            {
                workout.Exercises.Add(exercise);
            }

            for (int i = 0; i < 4; i++)
            {
                program.Workouts.Add(workout);
            }

            programRepository.Setup(x => x.Get(programId)).ReturnsAsync(program);

            var response = await controller.CreatePDF(programId);
            var result = Assert.IsType<FileContentResult>(response);
            var file = Assert.IsType<byte[]>(result.FileContents);
            Assert.NotNull(file);
        }

        [Fact]
        public async void CreatePDFAndSendToEmail_ReturnsOk()
        {
            var programId = 13;
            var exercise = new Exercise
            {
                Name = "Exercise",
                Sets = 4,
                Reps = "12, 12, 12, 12",
                Rest = 60,
            };

            var workout = new WorkoutDay
            {
                Name = "Workout",
                Exercises = new List<Exercise>(),
            };

            var program = new WorkoutProgram
            {
                Id = programId,
                Name = "Program",
                Workouts = new List<WorkoutDay>(),
            };

            for (int i = 0; i < 4; i++)
            {
                workout.Exercises.Add(exercise);
            }

            for (int i = 0; i < 4; i++)
            {
                program.Workouts.Add(workout);
            }

            programRepository.Setup(x => x.Get(programId)).ReturnsAsync(program);

            var response = await controller.CreatePDFAndSendToEmail("juoznark@gmail.com", programId);
            Assert.IsType<OkResult>(response);
        }
    }
}
