using backend.Entities;
using backend.Model.Project;
using Microsoft.EntityFrameworkCore;

namespace backend.IServices
{
    public interface IProjectService
    {
        public List<Project> GetAllProjects(int userId);

        public Project GetProject(int userId, ProjectDto project);

        public void DeleteProject(int userId, ProjectDto project);

        public Project UpdateProject(int userId, ProjectDto project);

        public Task<Project> CreateProject(int userId, ProjectDto project);
    }
}
