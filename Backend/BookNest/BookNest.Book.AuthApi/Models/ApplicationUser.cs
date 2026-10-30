using Microsoft.AspNetCore.Identity;

namespace BookNest.Book.AuthApi.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }

    }
}
