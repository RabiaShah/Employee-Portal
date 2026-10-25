using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FirstProject.Models;

public partial class Designation
{
    [Key]
    public int DesigId { get; set; }

    public string DesigName { get; set; } = null!;

    public int DeptId { get; set; }

    public string? DeptName { get; set; } = null;

    public virtual Departments? Dept { get; set; } = null!;
}
