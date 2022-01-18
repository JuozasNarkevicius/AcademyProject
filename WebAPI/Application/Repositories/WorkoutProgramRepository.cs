using Application.DatabaseContext;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Repositories
{
    public interface IWorkoutProgramRepository
    {
        public Task<IEnumerable<WorkoutProgram>> GetAll();
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

        public async Task<IEnumerable<WorkoutProgram>> GetAll()
        {
            var programs = await _context.Programs.ToListAsync();

            return programs;
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
