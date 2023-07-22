namespace backend.Model.Project
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public DateOnly Created { get; set; }
    }
}
