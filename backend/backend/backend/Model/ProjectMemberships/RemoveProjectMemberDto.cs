using System.ComponentModel.DataAnnotations;

namespace backend.Model.ProjectMemberships
{
    public class RemoveProjectMemberDto
    {
        [Required]
        public int ProjectId { get; set; }
        [Required]
        public int UserId { get; set; }
    }
}
