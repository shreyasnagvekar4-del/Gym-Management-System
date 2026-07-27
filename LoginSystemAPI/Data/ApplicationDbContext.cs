using Microsoft.EntityFrameworkCore;
using LoginSystemAPI.Models;
namespace LoginSystemAPI.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options ) : base(options ) { }

        public DbSet<User> Users { get; set; }

        public DbSet<MembershipPlan> MembershipPlans { get; set; }

        public DbSet<Attendance> Attendances { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<MembershipPlan>()
                .Property(p => p.Price)
                .HasPrecision(10, 2);
        }
    }
}
