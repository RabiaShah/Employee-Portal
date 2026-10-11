using FirstProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FirstProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly MasterDbContext dbContext;

        public UsersController(MasterDbContext _dbContext)
        {
            dbContext = _dbContext;
        }

        [HttpGet("GetUsers")]
        public IActionResult GetUsers()
        {
            try
            {
                var users = dbContext.Users.ToList();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving users: {ex.Message}");
            }
        }

        [HttpGet("GetUsersAsync")]
        public async Task<IActionResult> GetUsersAsync() {
            try
            {
                var users =  await dbContext.Users.ToListAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving users asynchronously: {ex.Message}");
            }
        }

        [HttpPost("AddUser")]
        public async Task<IActionResult> AddUser(User user) {
            try
            {
                dbContext.Users.Add(user);
                var adduser = await dbContext.SaveChangesAsync();

                if (adduser == 1) return Ok("User added successfully!");
                else BadRequest("Unable to add user");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while adding a user: {ex.Message}");
            }
        }

        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser(User newUser) {
            var user = dbContext.Users.Find(newUser.Id);
            if (user != null)
            {
                dbContext.Entry(user).CurrentValues.SetValues(newUser);
                var result = await dbContext.SaveChangesAsync();
                if (result != 0)
                    return Ok("User updated successfully!");
                else
                    return BadRequest("Unable to update user.");
            }
            else
                return NotFound("User not found");
        }

        [HttpPatch("RemoveUser/{id}")]
        public async Task<IActionResult> RemoveUser(int id) {
            var user = dbContext.Users.Find(id);

            if (user != null)
            {

                user.IsActive = false;
                var result = await dbContext.SaveChangesAsync();
                if (result != 0)
                    return Ok("User removed successfully!");
                else
                    return BadRequest("Unable to remove user.");

            }
            else
                return NotFound("User not found.");
        }

        [HttpDelete("DeleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(int id) {
            var user = dbContext.Users.Find(id);

            if (user != null)
            {

                dbContext.Users.Remove(user);
                var result = await dbContext.SaveChangesAsync();

                if (result != 0)
                    return Ok("User deleted successfully");
                else
                    return BadRequest("Unable to delete user.");

            }

            return NoContent();
        }


    }
}
