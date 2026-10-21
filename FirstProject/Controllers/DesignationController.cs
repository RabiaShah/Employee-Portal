using FirstProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FirstProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DesignationController : ControllerBase
    {
        private readonly MasterDbContext dbContext;

        public DesignationController(MasterDbContext _dbContext)
        {
            dbContext = _dbContext;
        }

        [HttpGet("GetDesignations")]
        public async Task<IActionResult> GetDesignations()
        {
            try
            {
                var designations = await dbContext.Designations.ToListAsync();
                return Ok(designations);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving designations: {ex.Message}");
            }
        }

        [HttpPost("AddDesignation")]
        public async Task<IActionResult> AddDesignation([FromBody] Designation designation)
        {
            try
            {
                dbContext.Designations.Add(designation);
                var addDesig = await dbContext.SaveChangesAsync();

                if (addDesig == 1) return Ok(new { message = "Designation added successfully!" });
                else return BadRequest(new { message = "Unable to add designation" });

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while adding designation: {ex.Message}");
            }
        }

        [HttpPut("UpdateDesignation")]
        public async Task<IActionResult> UpdateDesignation([FromBody] Designation newDesignation)
        {
            try
            {
                var designation = await dbContext.Designations.FindAsync(newDesignation.DesigId);
                if (designation != null)
                {
                    dbContext.Entry(designation).CurrentValues.SetValues(newDesignation);
                    var result = await dbContext.SaveChangesAsync();
                    if (result != 0)
                        return Ok(new { message = "Designation updated successfully!" });
                    else
                        return BadRequest(new { message = "Unable to update designation." });
                }
                else
                    return NotFound(new { message = "Designation not found" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while updating designation: {ex.Message}");
            }
        }

        [HttpDelete("DeleteDesignation/{id}")]
        public async Task<IActionResult> DeleteDesignation(int id)
        {
            try
            {
                var designation = await dbContext.Designations.FindAsync(id);

                if (designation != null)
                {
                    dbContext.Designations.Remove(designation);
                    var result = await dbContext.SaveChangesAsync();

                    if (result != 0)
                        return Ok(new { message = "Designation deleted successfully" });
                    else
                        return BadRequest(new { message = "Unable to delete designation." });
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while deleting designation: {ex.Message}");
            }
        }
    }
}
