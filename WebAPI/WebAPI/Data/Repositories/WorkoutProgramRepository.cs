using Microsoft.EntityFrameworkCore;
using WebAPI.Data.Entities;

namespace WebAPI.Data.Repositories
{
    public interface IWorkoutProgramRepository
    {
        public Task<WorkoutProgram> Get(long id);
    }
    public class WorkoutProgramRepository : IWorkoutProgramRepository
    {
        private readonly WebContext _context;
        public WorkoutProgramRepository(WebContext context)
        {
            _context = context;
        }

        public async Task<WorkoutProgram> Get(long id)
        {
            var program = await _context.Programs
                .Include(p => p.Workouts)
                .ThenInclude(w => w.Exercises)
                .FirstOrDefaultAsync(p => p.Id == id);

            return program;
        }
    }
}
