using HotelWebBackEnd.Model;
using Microsoft.EntityFrameworkCore;

namespace HotelWebBackEnd.DataBase
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions options):base(options) { }

        public DbSet<Emp> emps { get; set; }
        public DbSet<User> users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                //Set default value for isActive in the database
                entity.Property(e => e.IsActive)
                      .HasDefaultValue(true);
            });
        }
    }

}
