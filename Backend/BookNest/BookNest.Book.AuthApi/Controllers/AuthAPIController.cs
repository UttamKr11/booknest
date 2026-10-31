using BookNest.Book.AuthApi.Models;
using BookNest.Book.AuthApi.Models.Dto;
using BookNest.Book.AuthApi.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Text.Json.Serialization;

namespace BookNest.Book.AuthApi.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthAPIController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private const string CustomerRole = "CUSTOMER";
        private const string AdminRole = "ADMIN";
        private readonly ResponseDto _responseDto;
        private IJwtTokenGenerator _jwtTokenGenerator;
        public AuthAPIController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IJwtTokenGenerator jwtTokenGenerator)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _jwtTokenGenerator = jwtTokenGenerator;
            _responseDto = new ResponseDto();
        }
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegistrationRequestDto model)
        {
            var role = string.IsNullOrEmpty(model.Role) ? CustomerRole : model.Role.ToUpper();
            if (role != CustomerRole)
            {
                if (role != AdminRole)
                {
                    _responseDto.IsSuccess = false;
                    _responseDto.Message = "Invalid Role";
                    return BadRequest(_responseDto);

                }
            }
            ApplicationUser user = new()
            {
                Name = model.Name,
                UserName = model.Email,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber
            };
            try
            {
                var result = await _userManager.CreateAsync(user);
                if (!result.Succeeded)
                {
                    _responseDto.IsSuccess = false;
                    _responseDto.Message = JsonConvert.SerializeObject(result.Errors);
                    return BadRequest(_responseDto);
                }
            }
            catch (Exception ex)
            {
            }
            if (!await _roleManager.RoleExistsAsync(role))
            {
                await _roleManager.CreateAsync(new IdentityRole(role));
            }
            await _userManager.AddToRoleAsync(user, role);
            _responseDto.Result = new LoginResponseDto
            {
                Token = _jwtTokenGenerator.GenerateToken(user, await _userManager.GetRolesAsync(user)),
                user = new()
                {
                    Name = user.Name,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber
                }

            };
            return Ok(_responseDto);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null || await _userManager.CheckPasswordAsync(user, model.Password))
            {
                _responseDto.IsSuccess = false;
                _responseDto.Message = "User name or password incorrect";
                return BadRequest(_responseDto);
            }
            _responseDto.Result = new LoginResponseDto
            {
                Token = _jwtTokenGenerator.GenerateToken(user, await _userManager.GetRolesAsync(user)),
                user = new()
                {
                    Name = user.Name,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber
                }
            };
            return Ok(_responseDto);
        }
    }
}
