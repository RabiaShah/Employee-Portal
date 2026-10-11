using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FirstProject.Models;

public partial class Departments
{
    [Key]
    public int DeptId { get; set; }

    public string DeptName { get; set; } = null!;

    public bool IsActive { get; set; }

    public virtual ICollection<Designation> Designations { get; set; } = new List<Designation>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
