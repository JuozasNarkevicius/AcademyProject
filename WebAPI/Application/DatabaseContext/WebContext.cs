using Application.DataSeed;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.DatabaseContext
{
    public class WebContext : DbContext
    {
        public WebContext(DbContextOptions<WebContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Seed();
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<WorkoutDay> Workouts { get; set; }
        public DbSet<WorkoutProgram> Programs { get; set; }
        public DbSet<TrainerApplication> Applications { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<SavedProgram> SavedPrograms { get; set; }
        public DbSet<ExerciseName> ExerciseNames { get; set; }

    }
}
