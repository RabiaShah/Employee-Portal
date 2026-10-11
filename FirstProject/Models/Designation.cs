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

    public virtual Departments? Dept { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
