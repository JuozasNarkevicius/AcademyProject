using Domain.Entities;
using System.Text.Json.Serialization;

namespace Application.Jwt
{
    public class AuthenticateResponse
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        [JsonIgnore]
        public string RefreshToken { get; set; }


        public AuthenticateResponse(User user, string token, string refreshToken)
        {
            Id = user.Id;
            FirstName = user.FirstName;
            LastName = user.LastName;
            Age = user.Age;
            Email = user.Email;
            Token = token;
            RefreshToken = refreshToken;
        }
    }
}
