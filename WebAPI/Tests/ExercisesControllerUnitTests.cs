using Application.DatabaseContext;
using Application.Repositories;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Controllers;
using WebAPI.DTO_s;
using Xunit;

namespace Tests
{
    public class ExercisesControllerUnitTests
    {
        private readonly ExercisesController controller;
        private readonly Mock<IExerciseRepository> exerciseRepository;

        public ExercisesControllerUnitTests()
        {
            var mockMapper = new MapperConfiguration(cfg => cfg.AddProfile(new Profiles()));
            exerciseRepository = new Mock<IExerciseRepository>();
            controller = new ExercisesController(exerciseRepository.Object, mockMapper.CreateMapper());
        }

        [Fact]
        public async void GetExercise_ReturnsCorrectValue()
        {
            var Id = 13;
            var exercise = new Exercise
            {
                Id = Id,
                Name = "Exercise",
                Sets = 4,
                Reps = "12, 12, 12, 12",
                Rest = 60,
                Position = 1,
            };

            exerciseRepository.Setup(x => x.Get(Id)).ReturnsAsync(exercise);

            var response = await controller.GetExercise(Id);
            var result = Assert.IsType<OkObjectResult>(response.Result);
            var actualExercise = Assert.IsType<ExerciseDTO>(result.Value);

            Assert.Equal(exercise.Name, actualExercise.Name);
            Assert.Equal(exercise.Sets, actualExercise.Sets);
            Assert.Equal(exercise.Reps, actualExercise.Reps);
            Assert.Equal(exercise.Rest, actualExercise.Rest);
            Assert.Equal(exercise.Position, actualExercise.Position);
        }

        [Fact]
        public async Task GetExercise_ReturnsNotFound()
        {
            long exerciseId = 5;

            var response = await controller.GetExercise(exerciseId);

            Assert.IsType<NotFoundResult>(response.Result);
        }

        [Fact]
        public async Task CreateExercise_ReturnsOkAndCreatedExercise()
        {
            var exerciseDTO = new CreateExerciseDTO
            {
                Name = "Exercise",
                Sets = 4,
                Reps = "12, 12, 12, 12",
                Rest = 60,
                Position = 1,
            };

            var workoutId = 1;

            var exercise = new Exercise
            {
                Id = 1,
                Name = exerciseDTO.Name,
                Sets = exerciseDTO.Sets,
                Reps = exerciseDTO.Reps,
                Rest = exerciseDTO.Rest,
                Position = exerciseDTO.Position,
                WorkoutId = workoutId,
            };

            exerciseRepository.Setup(repo => repo.Add(It.IsAny<Exercise>())).ReturnsAsync(exercise);
            var response = await controller.PostExercise(exerciseDTO, workoutId);

            var result = Assert.IsType<CreatedAtActionResult>(response.Result);
            var CreatedExercise = Assert.IsType<ExerciseDTO>(result.Value);
            Assert.Equal(exerciseDTO.Name, CreatedExercise.Name);
            Assert.Equal(exerciseDTO.Sets, CreatedExercise.Sets);
            Assert.Equal(exerciseDTO.Reps, CreatedExercise.Reps);
            Assert.Equal(exerciseDTO.Rest, CreatedExercise.Rest);
            Assert.Equal(exerciseDTO.Position, CreatedExercise.Position);
        }

        [Fact]
        public async Task UpdateExercise_ReturnsOkAndUpdatedExercise()
        {
            var exercise = new Exercise
            {
                Id = 1,
                Name = "Exercise",
                Sets = 4,
                Reps = "12, 12, 12, 12",
                Rest = 60,
                Position = 1,
            };

            var exerciseDTO = new UpdateExerciseDTO
            {
                Name = "Exercise3",
                Sets = 5,
                Reps = "11, 11, 11, 11",
                Rest = 60,
            };

            var updatedExerciseDb = new Exercise
            {
                Id = 1,
                Name = "Exercise3",
                Sets = 5,
                Reps = "11, 11, 11, 11",
                Rest = 60,
            };

            exerciseRepository.Setup(x => x.Get(exercise.Id)).ReturnsAsync(exercise);
            exerciseRepository.Setup(repo => repo.Update(It.IsAny<Exercise>())).ReturnsAsync(updatedExerciseDb);

            var response = await controller.PutExercise(exercise.Id, exerciseDTO);

            var result = Assert.IsType<OkObjectResult>(response);
            var updatedExercise = Assert.IsType<ExerciseDTO>(result.Value);
            Assert.Equal(exerciseDTO.Name, updatedExercise.Name);
            Assert.Equal(exerciseDTO.Sets, updatedExercise.Sets);
            Assert.Equal(exerciseDTO.Reps, updatedExercise.Reps);
            Assert.Equal(exerciseDTO.Rest, updatedExercise.Rest);
        }

        [Fact]
        public async Task UpdateExercise_ReturnsNotFound()
        {
            long exerciseId = 5;

            var exerciseDTO = new UpdateExerciseDTO
            {
                Name = "Exercise3",
                Sets = 5,
                Reps = "11, 11, 11, 11",
                Rest = 60,
            };

            var response = await controller.PutExercise(exerciseId, exerciseDTO);

            Assert.IsType<NotFoundResult>(response);
        }

        [Fact]
        public async Task DeleteExercise_ReturnsNoContent()
        {
            var exerciseId = 5;

            var exercise = new Exercise
            {
                Id = exerciseId,
                Name = "Exercise",
                Sets = 4,
                Reps = "12, 12, 12, 12",
                Rest = 60,
                Position = 1,
            };

            exerciseRepository.Setup(x => x.Get(exercise.Id)).ReturnsAsync(exercise);
            exerciseRepository.Setup(repo => repo.Delete(It.IsAny<Exercise>())).Verifiable();

            var deleteResponse = await controller.DeleteExercise(exerciseId);

            Assert.IsType<NoContentResult>(deleteResponse);
            exerciseRepository.Verify();
        }

        [Fact]
        public async Task DeleteExercise_NotFound()
        {
            long exerciseId = 5;

            var response = await controller.DeleteExercise(exerciseId);

            Assert.IsType<NotFoundResult>(response);
        }

        //[Theory]
        ////[InlineData(1, 0, 4, new int[] { 4, 1, 2, 3, 0 })]
        ////[InlineData(1, 0, 1, new int[] { 0, 1, 2, 3, 4 })]
        ////[InlineData(1, 2, 0)]
        ////[InlineData(1, 2, 0)]
        ////[InlineData(1, 2, 0)]
        ////[InlineData(int.MinValue, -1, int.MaxValue)]
        //public async void CanAddTheory(int workoutId, int first, int second, int[] expected)
        //{
        //    var workout = new WorkoutDay
        //    {
        //        Id = workoutId,
        //        Name = "workout",
        //        Position = 0,
        //        Exercises = new List<Exercise>(),
        //    };

        //    for (int i = 0; i < 5; i++)
        //    {
        //        var exercise = new Exercise
        //        {
        //            Id = 1,
        //            Name = "Exercise",
        //            Sets = 4,
        //            Reps = "12, 12, 12, 12",
        //            Rest = 60,
        //            Position = i,
        //        };
        //        workout.Exercises.Add(exercise);
        //    }

        //    List<int> positions = new List<int> { first, second };

        //    exerciseRepository.Setup(x => x.GetExercisesByWorkout(workoutId)).ReturnsAsync(workout.Exercises);

        //    var response = await controller.PutPositions(workoutId, positions);

        //    var result = Assert.IsType<OkObjectResult>(response.Result);
        //    var exerciseList = Assert.IsType<List<Exercise>>(result.Value);

        //    int[] positionsArray = new int[5];
        //    for (int i = 0; i < 5; i++)
        //    {
        //        positionsArray[i] = exerciseList.ElementAt(i).Position;
        //    }

        //    Assert.Equal(expected, positionsArray);
        //}
    }
}