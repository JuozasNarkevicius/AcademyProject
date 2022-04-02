using Application.DatabaseContext;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Repositories
{
    public interface ITrainerApplicationRepository
    {
        public Task<IEnumerable<TrainerApplication>> GetAllVerified();
        public Task<IEnumerable<TrainerApplication>> GetAll();
        public Task<TrainerApplication> Get(long id);
        public Task<TrainerApplication> GetByUserId(long id);
        public Task<TrainerApplication> Add(TrainerApplication application);
        public Task<TrainerApplication> Update(TrainerApplication application);
        public Task Delete(TrainerApplication application);
    }
    public class TrainerApplicationRepository : ITrainerApplicationRepository
    {
        private readonly WebContext _context;

        public TrainerApplicationRepository(WebContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TrainerApplication>> GetAll()
        {
            var applications = await _context.Applications
                .Where(appl => appl.Status != "declined")
                .ToListAsync();

            return applications;
        }

        public async Task<IEnumerable<TrainerApplication>> GetAllVerified()
        {
            var applications = await _context.Applications
                .Where(a => a.Status == "verified")
                .ToListAsync();

            return applications;
        }
        public async Task<TrainerApplication> Get(long id)
        {
            var application = await _context.Applications.FindAsync(id);

            return application;
        }

        public async Task<TrainerApplication> GetByUserId(long id)
        {
            var application = await _context.Applications
                .Where(a => a.UserId == id)
                .FirstOrDefaultAsync();

            return application;
        }

        public async Task<TrainerApplication> Update(TrainerApplication application)
        {
            _context.Applications.Update(application);
            await _context.SaveChangesAsync();
            return await Get(application.Id);
        }

        public async Task<TrainerApplication> Add(TrainerApplication application)
        {
            _context.Applications.Add(application);
            await _context.SaveChangesAsync();
            return await Get(application.Id);
        }
        public async Task Delete(TrainerApplication application)
        {
            _context.Applications.Remove(application);
            await _context.SaveChangesAsync();
        }
    }
}
