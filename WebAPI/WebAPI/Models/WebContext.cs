using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace WebAPI.Models
{
    public class WebContext : DbContext
    {
        public WebContext(DbContextOptions<WebContext> options) : base(options)
        {
            
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<WorkoutDay> Workouts { get; set; }
        public DbSet<WorkoutProgram> Programs { get; set; }

    }
}
