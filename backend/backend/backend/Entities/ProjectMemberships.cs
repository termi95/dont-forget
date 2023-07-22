using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using static backend.Model.ProjectMemberships.ProjectMembershipsEnum;

namespace backend.Entities
{
    public class ProjectMemberships
    {
        [Key]
        public int Id { get; set; }
        [Required, DisallowNull]
        public int UserId { get; set; }
        [Required, DisallowNull]
        public int ProjectId { get; set; }
        [Required, DisallowNull]
        public DateOnly Created { get; set; }
        public DateOnly Updated { get; set;}
        public Role Role { get; set; }
    }
}
