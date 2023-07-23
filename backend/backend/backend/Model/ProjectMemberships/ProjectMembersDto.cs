using static backend.Model.ProjectMemberships.ProjectMembershipsEnum;

namespace backend.Model.ProjectMemberships
{
    public class ProjectMembersDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public string Email { get; set; }
        public Role Role { get; set; }
        public DateOnly Created { get; set; }
    }
}
