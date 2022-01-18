namespace Application.Jwt
{
    public class AuthenticateResponse
    {
        public string Token { get; set; }


        public AuthenticateResponse(string token)
        {
            Token = token;
        }
    }
}
