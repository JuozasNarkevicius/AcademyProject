using Microsoft.EntityFrameworkCore;
using WebAPI.Data.Entities;

namespace WebAPI.Data.Repositories
{
    public interface IUserRepository
    {
        public Task<IEnumerable<User>> GetAll();
        public Task<User> Get(long id);
        public Task<User> Update(User user);
        public Task<User> Add(User user);
        public Task Delete(User user);
    }
    public class UserRepository : IUserRepository
    {
        private readonly WebContext _context;
        public UserRepository(WebContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            var users = await _context.Users.ToListAsync();

            return users;
        }
        public async Task<User> Get(long id)
        {
            var user = await _context.Users.FindAsync(id);

            return user;
        }
        public async Task<User> Update(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return await Get(user.Id);
        }
        public async Task<User> Add(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return await Get(user.Id);
        }
        public async Task Delete(User user)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
    }
}
