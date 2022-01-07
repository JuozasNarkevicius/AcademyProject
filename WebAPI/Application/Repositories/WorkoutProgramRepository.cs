using Application.DatabaseContext;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Repositories
{
    public interface IWorkoutProgramRepository
    {
        public Task<WorkoutProgram> Get(long id);
        public Task<WorkoutProgram> Add(WorkoutProgram program);
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

        public async Task<WorkoutProgram> Add(WorkoutProgram program)
        {
            _context.Programs.Add(program);
            await _context.SaveChangesAsync();
            return await Get(program.Id);
        }
    }
}
