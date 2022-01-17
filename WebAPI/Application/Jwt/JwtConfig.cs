namespace Application.Jwt
{
    public class JwtConfig
    {
        public string Secret { get; set; }

        public int RefreshTokenTTL { get; set; }
    }
}
