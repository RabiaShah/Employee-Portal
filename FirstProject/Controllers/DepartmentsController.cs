using FirstProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FirstProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentsController : ControllerBase
    {
        private readonly MasterDbContext dbContext;

        public DepartmentsController(MasterDbContext _dbContext)
        {
            dbContext = _dbContext;
        }

        [HttpGet("GetDepartments")]
        public async Task<IActionResult> GetDepartments()
        {
            try
            {
                var departments = await dbContext.Departments.ToListAsync();
                return Ok(departments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving departments: {ex.Message}");
            }
        }

        [HttpPost("AddDepartment")]
        public async Task<IActionResult> AddDepartment([FromBody] Departments department)
        {
            try
            {
                dbContext.Departments.Add(department);
                var addDept = await dbContext.SaveChangesAsync();

                if (addDept == 1) return Ok(new { message = "Department added successfully!" });
                else return BadRequest(new { message = "Unable to add department" });

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while adding department: {ex.Message}");
            }
        }

        [HttpPut("UpdateDepartment")]
        public async Task<IActionResult> UpdateDepartment([FromBody] Departments newDepartment)
        {
            try
            {
                var department = await dbContext.Departments.FindAsync(newDepartment.DeptId);
                if (department != null)
                {
                    dbContext.Entry(department).CurrentValues.SetValues(newDepartment);
                    var result = await dbContext.SaveChangesAsync();
                    if (result != 0)
                        return Ok(new { message = "Department updated successfully!" });
                    else
                        return BadRequest(new { message = "Unable to update department." });
                }
                else
                    return NotFound(new { message = "Department not found" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while updating department: {ex.Message}");
            }
        }

        [HttpPatch("RemoveDepartment/{id}")]
        public async Task<IActionResult> RemoveDepartment(int id)
        {
            try
            {
                var department = await dbContext.Departments.FindAsync(id);

                if (department != null)
                {
                    department.IsActive = false;
                    var result = await dbContext.SaveChangesAsync();
                    if (result != 0)
                        return Ok(new { message = "Department removed successfully!" });
                    else
                        return BadRequest(new { message = "Unable to remove department." });
                }
                else
                    return NotFound(new { message = "Department not found." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while removing department: {ex.Message}");
            }
        }

        [HttpDelete("DeleteDepartment/{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            try
            {
                var department = await dbContext.Departments.FindAsync(id);

                if (department != null)
                {
                    dbContext.Departments.Remove(department);
                    var result = await dbContext.SaveChangesAsync();

                    if (result != 0)
                        return Ok(new { message = "Department deleted successfully" });
                    else
                        return BadRequest(new { message = "Unable to delete department." });
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while deleting department: {ex.Message}");
            }
        }
    }
}
