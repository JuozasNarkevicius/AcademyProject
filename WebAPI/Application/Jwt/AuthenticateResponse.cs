namespace Application.Jwt
{
    public class AuthenticateResponse
    {
        public long Id { get; set; }
        //public string Token { get; set; }


        public AuthenticateResponse(long id)
        {
            Id = id;
        }
    }
}
