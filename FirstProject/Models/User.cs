using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FirstProject.Models;

public partial class User
{
    [Key]
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public int? Phone { get; set; }
    public string? Address { get; set; }

    public int DeptId { get; set; }

    public int DesigId { get; set; }
        
    public bool IsActive { get; set; }

    public string? Department { get; set; } = null;

    public string? Designation { get; set; } = null;

    public virtual Departments? Dept { get; set; } = null;

    public virtual Designation? Desig { get; set; } = null;
}
