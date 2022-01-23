using Application.DatabaseContext;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Repositories
{
    public interface IWorkoutDayRepository
    {
        public Task<IEnumerable<WorkoutDay>> GetAll();
        public Task<WorkoutDay> Get(long id);
        public Task<WorkoutDay> Update(WorkoutDay workout);
        public Task<WorkoutDay> Add(WorkoutDay workout);
        public Task Delete(WorkoutDay workout);

        public Task<WorkoutDay> GetWorkoutName(long id);
    }
    public class WorkoutDayRepository : IWorkoutDayRepository
    {
        private readonly WebContext _context;

        public WorkoutDayRepository(WebContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<WorkoutDay>> GetAll()
        {
            var workouts = await _context.Workouts
                .Include(w => w.Exercises)
                .ToListAsync();

            return workouts;
        }
        public async Task<WorkoutDay> Get(long id)
        {
            var workout = await _context.Workouts
                .Include(w => w.Exercises)
                .FirstOrDefaultAsync(w => w.Id == id);

            return workout;
        }

        public async Task<WorkoutDay> Update(WorkoutDay workout)
        {
            _context.Workouts.Update(workout);
            await _context.SaveChangesAsync();
            return await Get(workout.Id);
        }
        public async Task<WorkoutDay> GetWorkoutName(long id)
        {
            var workout = await _context.Workouts
                .FirstOrDefaultAsync(p => p.Id == id);

            return workout;
        }
        public async Task<WorkoutDay> Add(WorkoutDay workout)
        {
            _context.Workouts.Add(workout);
            await _context.SaveChangesAsync();
            return await Get(workout.Id);
        }
        public async Task Delete(WorkoutDay workout)
        {
            _context.Workouts.Remove(workout);
            await _context.SaveChangesAsync();
        }
    }
}
