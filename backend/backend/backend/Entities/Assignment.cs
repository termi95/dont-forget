using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using static backend.Model.Task.AssignmentEnum;

namespace backend.Entities
{
    public class Assignment
    {
        public int Id { get; set; }
        [MinLength(3), MaxLength(32), NotNull]
        public string Name { get; set; }
        public string Body { get; set; }
        [NotNull]
        public bool Done { get; set; }
        [NotNull]
        public Priority Priority { get; set; }
        [NotNull]

        public DateTime CreationDate { get; set; }
        [AllowNull]
        public DateTime? FinishDate { get; set; }
        [NotNull]
        public int ProjectId { get; set; }
        [NotNull]
        public int DoerId { get; set; }
    }
}
