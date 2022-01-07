using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataSeed
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<WorkoutProgram>().HasData(
                new WorkoutProgram
                {
                    Id = 1,
                    Name = "Program nr1",
                    UserId = 1,
                }
            );
            modelBuilder.Entity<WorkoutDay>().HasData(
                new WorkoutDay { Id = 1, Name = "Workout nr1", ProgramId = 1 },
                new WorkoutDay { Id = 2, Name = "Workout nr2", ProgramId = 1 },
                new WorkoutDay { Id = 3, Name = "Workout nr3", ProgramId = 1 },
                new WorkoutDay { Id = 4, Name = "Workout nr4", ProgramId = 1 }
            );
            modelBuilder.Entity<Exercise>().HasData(
                new Exercise { Id = 1, Name = "Exercise nr1", Sets = 4, Reps = "12, 12, 12, 12", Rest = 90, WorkoutId = 1 },
                new Exercise { Id = 2, Name = "Exercise nr2", Sets = 4, Reps = "12, 12, 12, 12", Rest = 90, WorkoutId = 1 },
                new Exercise { Id = 3, Name = "Exercise nr3", Sets = 4, Reps = "12, 12, 12, 12", Rest = 90, WorkoutId = 1 },
                new Exercise { Id = 4, Name = "Exercise nr4", Sets = 4, Reps = "12, 12, 12, 12", Rest = 90, WorkoutId = 1 },

                new Exercise { Id = 5, Name = "Exercise nr1", Sets = 4, Reps = "12, 12, 12, 12", Rest = 90, WorkoutId = 2 },
                new Exercise { Id = 6, Name = "Exercise nr2", Sets = 4, Reps = "12, 12, 12, 12", Rest = 90, WorkoutId = 2 },
                new Exercise { Id = 7, Name = "Exercise nr3", Sets = 4, Reps = "12, 12, 12, 12", Rest = 90, WorkoutId = 2 },
                new Exercise { Id = 8, Name = "Exercise nr4", Sets = 4, Reps = "12, 12, 12, 12", Rest = 90, WorkoutId = 2 },

                new Exercise { Id = 9, Name = "Exercise nr1", Sets = 4, Reps = "12, 12, 12, 12", Rest = 90, WorkoutId = 3 },
                new Exercise { Id = 10, Name = "Exercise nr2", Sets = 4, Reps = "12, 12, 12, 12", Rest = 90, WorkoutId = 3 },
                new Exercise { Id = 11, Name = "Exercise nr3", Sets = 4, Reps = "12, 12, 12, 12", Rest = 90, WorkoutId = 3 },
                new Exercise { Id = 12, Name = "Exercise nr4", Sets = 4, Reps = "12, 12, 12, 12", Rest = 90, WorkoutId = 3 },

                new Exercise { Id = 13, Name = "Exercise nr1", Sets = 4, Reps = "12, 12, 12, 12", Rest = 90, WorkoutId = 4 },
                new Exercise { Id = 14, Name = "Exercise nr2", Sets = 4, Reps = "12, 12, 12, 12", Rest = 90, WorkoutId = 4 },
                new Exercise { Id = 15, Name = "Exercise nr3", Sets = 4, Reps = "12, 12, 12, 12", Rest = 90, WorkoutId = 4 },
                new Exercise { Id = 16, Name = "Exercise nr4", Sets = 4, Reps = "12, 12, 12, 12", Rest = 90, WorkoutId = 4 }
            );
        }
    }
}
