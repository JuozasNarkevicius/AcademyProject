using Application.DatabaseContext;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Repositories
{
    public interface ITrainerApplicationRepository
    {
        public Task<IEnumerable<TrainerApplication>> GetAll();
        public Task<TrainerApplication> Get(long id);
        public Task<TrainerApplication> Add(TrainerApplication application);
    }
    public class TrainerApplicationRepository : ITrainerApplicationRepository
    {
        private readonly WebContext context;

        public TrainerApplicationRepository(WebContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<TrainerApplication>> GetAll()
        {
            var applications = await context.Applications.ToListAsync();

            return applications;
        }
        public async Task<TrainerApplication> Get(long id)
        {
            var application = await context.Applications.FindAsync(id);

            return application;
        }

        public async Task<TrainerApplication> Add(TrainerApplication application)
        {
            context.Applications.Add(application);
            await context.SaveChangesAsync();
            return await Get(application.Id);
        }
    }
}
