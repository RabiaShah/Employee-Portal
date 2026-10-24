using FirstProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EmployeeApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly MasterDbContext dbContext;
        private readonly IConfiguration config;

        public LoginController(MasterDbContext _dbContext, IConfiguration _config)
        {
            dbContext = _dbContext;
            config = _config;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Login login)
        {
            try
            {
                var existingUser = dbContext.Login.FirstOrDefault(l => l.Username == login.Username && l.Password == login.Password);
                if (existingUser != null)
                {
                    var claims = new[]
                    {
                        new Claim(ClaimTypes.Name, existingUser.Username),
                        new Claim("userId", existingUser.Id.ToString() ?? "")
                    };
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!));
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var token = new JwtSecurityToken(
                        issuer: config["Jwt:Issuer"],
                        audience: config["Jwt:Audience"],
                        claims: claims,
                        expires: DateTime.UtcNow.AddHours(1),
                        signingCredentials: creds);


                    return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token), user = existingUser.Username });
                }
                else
                {
                    return Unauthorized(new { message = "Invalid username or password" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while processing the login: {ex.Message}");
            }
        }
    }
}
