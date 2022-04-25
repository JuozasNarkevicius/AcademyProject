using Application.DatabaseContext;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Repositories
{
    public interface IRatingRepository
    {
        public Task<double> GetAverage(long id, string item);
        public Task<Rating> Update(Rating rating);
        public Task<Rating> Add(Rating rating);
        public Task Delete(Rating rating);
        public Task<Rating> GetMyRating(long userId, string item, long itemId);
        public Task<int> GetRatingsCount(string item, long itemId);
        public Task<Rating> Get(long Id);
    };
    public class RatingRepository : IRatingRepository
    {
        private readonly WebContext context;

        public RatingRepository(WebContext context)
        {
            this.context = context;
        }

        public async Task<double> GetAverage(long id, string item)
        {
            try
            {
                double average;
                if (item == "programs")
                {
                    average = await context.Ratings
                        .Where(r => r.ProgramId == id)
                        .AverageAsync(r => r.StarCount);
                }
                else
                {
                    average = await context.Ratings
                        .Where(r => r.TrainerId == id)
                        .AverageAsync(r => r.StarCount);
                }

                return average;

            } catch (Exception ex)
            {
                return 0;
            }
        }

        public async Task<Rating> Get(long Id)
        {
            var rating = await context.Ratings.FindAsync(Id);

            return rating;
        }

        public async Task<Rating> GetMyRating(long userId, string item, long itemId)
        {
            Rating rating;
            if(item == "programs")
            {
                rating = await context.Ratings
                    .Where(r => r.ProgramId == itemId && r.UserId == userId)
                    .FirstOrDefaultAsync();
            } else
            {
                rating = await context.Ratings
                    .Where(r => r.TrainerId == itemId && r.UserId == userId)
                    .FirstOrDefaultAsync();
            }

            return rating;
        }

        public async Task<int> GetRatingsCount(string item, long itemId)
        {
            int ratingsCount;
            if (item == "programs")
            {
                ratingsCount = await context.Ratings
                    .CountAsync(r => r.ProgramId == itemId);
            } 
            else
            {
                ratingsCount = await context.Ratings
                    .CountAsync(r => r.TrainerId == itemId);
            }

            return ratingsCount;
        }

        public async Task<Rating> Update(Rating rating)
        {
            context.Ratings.Update(rating);
            await context.SaveChangesAsync();
            return rating;
        }
        public async Task<Rating> Add(Rating rating)
        {
            context.Ratings.Add(rating);
            await context.SaveChangesAsync();
            return rating;
        }
        public async Task Delete(Rating rating)
        {
            context.Ratings.Remove(rating);
            await context.SaveChangesAsync();
        }
    }
}
