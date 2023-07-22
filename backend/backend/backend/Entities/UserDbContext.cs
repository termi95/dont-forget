using Microsoft.EntityFrameworkCore;

namespace backend.Entities
{
    public class UserDbContext: DbContext
    {
        public UserDbContext(DbContextOptions options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectMemberships> ProjectMemberships { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
    }
}
