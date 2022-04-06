using Application.DatabaseContext;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Repositories
{
    public interface IWorkoutProgramRepository
    {
        public Task<IEnumerable<WorkoutProgram>> GetAll(long userId);
        public Task<IEnumerable<WorkoutProgram>> GetAllSaved(long userId);
        public Task<SavedProgram> GetSaved(long userId, long programId);
        public Task<SavedProgram> SaveProgram(SavedProgram program);
        public Task<IEnumerable<WorkoutProgram>> GetAllPublic();
        public Task<WorkoutProgram> Get(long id);
        public Task<WorkoutProgram> Add(WorkoutProgram program);
        public Task<WorkoutProgram> GetName(long id);
        public Task<WorkoutProgram> Update(WorkoutProgram program);
        public Task DeleteSavedProgram(SavedProgram savedProgram);
        public Task Delete(WorkoutProgram program);
    }
    public class WorkoutProgramRepository : IWorkoutProgramRepository
    {
        private readonly WebContext _context;
        public WorkoutProgramRepository(WebContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<WorkoutProgram>> GetAll(long userId)
        {
            var programs = await _context.Programs.Where(p => p.UserId == userId).ToListAsync();

            return programs;
        }

        public async Task<IEnumerable<WorkoutProgram>> GetAllSaved(long userId)
        {
            var savedProgramsIds = await _context.SavedPrograms.Where(p => p.UserId == userId).Select(p => p.ProgramId).ToListAsync();

            var savedPrograms = await _context.Programs.Where(p => savedProgramsIds.Contains(p.Id)).ToListAsync();

            return savedPrograms;
        }

        public async Task<SavedProgram> GetSaved(long userId, long programId)
        {
            var savedProgram = await _context.SavedPrograms
                .Where(p => p.UserId == userId && p.ProgramId == programId)
                .FirstOrDefaultAsync();

            return savedProgram;
        }

        public async Task<SavedProgram> SaveProgram(SavedProgram program)
        {
            _context.SavedPrograms.Add(program);
            await _context.SaveChangesAsync();
            return program;
        }

        public async Task<IEnumerable<WorkoutProgram>> GetAllPublic()
        {
            var programs = await _context.Programs.Where(p => p.IsPublic == true).ToListAsync();

            return programs;
        }

        public async Task<WorkoutProgram> Get(long id)
        {
            var program = await _context.Programs
                .Where(p => p.Id == id)
                .Include(p => p.Workouts)
                .ThenInclude(w => w.Exercises)
                .FirstOrDefaultAsync();

            program.Workouts = program.Workouts.OrderBy(w => w.Position).ToList();

            for (int i = 0; i < program.Workouts.Count; i++)
            {
                program.Workouts[i].Exercises = program.Workouts[i].Exercises.OrderBy(w => w.Position).ToList();
            }

            return program;
        }

        public async Task<WorkoutProgram> GetName(long id)
        {
            var program = await _context.Programs
                .FirstOrDefaultAsync(p => p.Id == id);

            return program;
        }

        public async Task<WorkoutProgram> Update(WorkoutProgram program)
        {
            _context.Programs.Update(program);
            await _context.SaveChangesAsync();
            return program;
        }

        public async Task<WorkoutProgram> Add(WorkoutProgram program)
        {
            _context.Programs.Add(program);
            await _context.SaveChangesAsync();
            return program;
        }

        public async Task DeleteSavedProgram(SavedProgram savedProgram)
        {
            _context.SavedPrograms.Remove(savedProgram);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(WorkoutProgram program)
        {
            _context.Programs.Remove(program);
            await _context.SaveChangesAsync();
        }
    }
}
