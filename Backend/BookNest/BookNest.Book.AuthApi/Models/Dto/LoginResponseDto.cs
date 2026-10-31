namespace BookNest.Book.AuthApi.Models.Dto
{
    public class LoginResponseDto
    {
        public UserDto user { get; set; }

        public string Token { get; set; }
    }
}
