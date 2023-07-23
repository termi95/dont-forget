using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace backend.Entities
{
    public class Project
    {
        [Key]
        public int Id { get; set; }
        [Required, NotNull, DisallowNull, MinLength(3), MaxLength(32)]
        public string Name { get; set; } = string.Empty;
        public DateOnly Created { get; set; }
        public DateOnly Updated { get; set; }
    }
}
