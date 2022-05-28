using Application.Repositories;
using BCrypt.Net;

namespace Application.Jwt
{
    public interface IAuthorizationService
    {
        public Task<bool> VerifyPassword(AuthenticateRequest request);
    }

    public class AuthorizationService : IAuthorizationService
    {
        private readonly IUserRepository _userRepository;

        public AuthorizationService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> VerifyPassword(AuthenticateRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            {
                return false;
            }

            var user = await _userRepository.Get(request.Email);

            if (user == null)
            {
                return false;
            }

            return BCrypt.Net.BCrypt.EnhancedVerify(request.Password, user.Password, hashType: HashType.SHA384);
        }
    }
}
