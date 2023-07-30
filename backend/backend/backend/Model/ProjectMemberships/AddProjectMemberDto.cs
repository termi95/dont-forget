using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using static backend.Model.ProjectMemberships.ProjectMembershipsEnum;

namespace backend.Model.ProjectMemberships
{
    public class AddProjectMemberDto
    {
        [Required]
        public int ProjectId { get; set; }
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public Role Role { get; set; }

    }
}
