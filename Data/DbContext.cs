using Microsoft.EntityFrameworkCore;
using practice.Models;

public class BirthdayContext : DbContext
{
    public BirthdayContext(DbContextOptions<BirthdayContext> options) : base(options)
    {
    }

    public DbSet<Birthday> Birthdays { get; set; } = null!;
}

