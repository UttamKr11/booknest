using BookNest.Book.AuthApi.Models;

namespace BookNest.Book.AuthApi.Service.IService
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(ApplicationUser user, IList<string> roles);
    }
}
