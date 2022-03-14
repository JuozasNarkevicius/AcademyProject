using Application.DatabaseContext;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Repositories
{
    public interface IRatingRepository
    {
        public Task<double> GetAverage(long id);
        public Task<ProgramRating> Update(ProgramRating rating);
        public Task<ProgramRating> Add(ProgramRating rating);
        public Task Delete(ProgramRating rating);
        public Task<ProgramRating> GetMyRating(long programId, long userId);
        public Task<ProgramRating> Get(long id);
    };
    public class RatingRepository : IRatingRepository
    {
        private readonly WebContext context;

        public RatingRepository(WebContext context)
        {
            this.context = context;
        }

        public async Task<double> GetAverage(long id)
        {
            try
            {
                var average = await context.Ratings
                .Where(r => r.ProgramId == id)
                .AverageAsync(r => r.StarCount);

                return average;

            } catch (Exception ex)
            {
                return 0;
            }
        }

        public async Task<ProgramRating> Get(long id)
        {
            var rating = await context.Ratings.FindAsync(id);

            return rating;
        }

        public async Task<ProgramRating> GetMyRating(long programId, long userId)
        {
            var rating = await context.Ratings
                .Where(r => r.ProgramId == programId && r.UserId == userId)
                .FirstOrDefaultAsync();

            return rating;
        }

        public async Task<ProgramRating> Update(ProgramRating rating)
        {
            context.Ratings.Update(rating);
            await context.SaveChangesAsync();
            return rating;
        }
        public async Task<ProgramRating> Add(ProgramRating rating)
        {
            context.Ratings.Add(rating);
            await context.SaveChangesAsync();
            return rating;
        }
        public async Task Delete(ProgramRating rating)
        {
            context.Ratings.Remove(rating);
            await context.SaveChangesAsync();
        }
    }
}
