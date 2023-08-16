using static backend.Model.Task.AssignmentEnum;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace backend.Model.Task
{
    public class AssignmentDto
    {
        public int Id { get; set; }
        [AllowNull]
        public string? Name { get; set; }
        public string? Body { get; set; }
        public bool Done { get; set; }
        public Priority Priority { get; set; }

        public DateTime CreationDate { get; set; }
        public DateTime? FinishDate { get; set; }
        public int ProjectId { get; set; }
        public int DoerId { get; set; }

    }
}
