namespace Application.Jwt
{
    public class AuthenticateResponse
    {
        public long Id { get; set; }
        public string Role { get; set; }


        public AuthenticateResponse(long id, string role)
        {
            Id = id;
            Role = role;
        }
    }
}
