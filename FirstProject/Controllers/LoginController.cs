using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FirstProject.Models;

namespace EmployeeApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly MasterDbContext dbContext;

        public LoginController(MasterDbContext _dbContext)
        {
            dbContext = _dbContext;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Login login)
        {
            try
            {
                var existingUser = dbContext.Login.FirstOrDefault(l => l.Username == login.Username && l.Password == login.Password);
                if (existingUser != null)
                {
                    return Ok(new { token = "Login successful" });
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
