using static backend.Model.ProjectMemberships.ProjectMembershipsEnum;

namespace backend.Model.ProjectMemberships
{
    public class ChangeMemberRoleDto
    {
        public int ProjectId { get; set; }
        public int UserId { get; set; }
        public Role Role { get; set; }

    }
}
