using WebAPI.Data.Entities;

namespace WebAPI.Data.Models
{
    public class AuthenticateResponse
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }

        public AuthenticateResponse(User user, string token)
        {
            Id = user.Id;
            FirstName = user.FirstName;
            LastName = user.LastName;
            Age = user.Age;
            Email = user.Email;
            Token = token;
        }
    }
}
