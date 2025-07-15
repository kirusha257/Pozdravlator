using Microsoft.EntityFrameworkCore;
using practice.Models;

namespace practice.Data
{
    public class BirthdayContext : DbContext
    {
        public DbSet<Birthday> Birthdays { get; set; }

        public BirthdayContext(DbContextOptions<BirthdayContext> options)
            : base(options) { }
    }
}
