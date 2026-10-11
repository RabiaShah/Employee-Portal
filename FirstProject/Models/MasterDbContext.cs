using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FirstProject.Models;

public partial class MasterDbContext : DbContext
{
    public MasterDbContext()
    {
    }

    public MasterDbContext(DbContextOptions<MasterDbContext> options): base(options)
    {
    }

    public virtual DbSet<Departments> Departments { get; set; }

    public virtual DbSet<Designation> Designations { get; set; }

    public virtual DbSet<User> Users { get; set; }
}
