using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace backend.Entities
{
    public class Project
    {
        [Key]
        public int Id { get; set; }
        [Required, DisallowNull, MinLength(3), MaxLength(32)]
        public string Name { get; set; }
        public DateOnly Created { get; set; }
        public DateOnly Updated { get; set; }
    }
}
