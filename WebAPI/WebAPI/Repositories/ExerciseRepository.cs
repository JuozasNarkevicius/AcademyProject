using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public interface IExerciseRepository
    {
        public Task<IEnumerable<Exercise>> GetAll();
        public Task<Exercise> Get(long id);
        public Task<Exercise> Update(Exercise exercise);
        public Task<Exercise> Add(Exercise exercise);
        public Task Delete(Exercise exercise);
    }
    public class ExerciseRepository : IExerciseRepository
    {
        private readonly WebContext context;

        public ExerciseRepository(WebContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Exercise>> GetAll()
        {
            var exercises = await context.Exercises.ToListAsync();

            return exercises;
        }
        public async Task<Exercise> Get(long id)
        {
            var exercise = await context.Exercises.FindAsync(id);

            return exercise;
        }

        public async Task<Exercise> Update(Exercise exercise)
        {
            context.Exercises.Update(exercise);
            await context.SaveChangesAsync();
            return await Get(exercise.Id);
        }
        public async Task<Exercise> Add(Exercise exercise)
        {
            context.Exercises.Add(exercise);
            await context.SaveChangesAsync();
            return await Get(exercise.Id);
        }
        public async Task Delete(Exercise exercise)
        {
            context.Exercises.Remove(exercise);
            await context.SaveChangesAsync();
        }
    }
}
