using Microsoft.EntityFrameworkCore;
using WebAPI.Data.Entities;

namespace WebAPI.Data
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

    }
}
