using backend.Entities;
using backend.Exceptions;
using backend.IServices;
using backend.Model.Project;
using static backend.Model.ProjectMemberships.ProjectMembershipsEnum;

namespace backend.Services
{
    public class ProjectService : IProjectService
    {
        private readonly UserDbContext _context;
        public ProjectService(UserDbContext context)
        {
            _context = context;
        }

        public List<Project> GetAllProjects(int userId)
        {
            return (from p in _context.Projects
                    join s in _context.ProjectMemberships on p.Id equals s.ProjectId
                    where s.UserId == userId
                    select new Project { Name = p.Name, Id = p.Id, Created = p.Created }).ToList();
        }

        public Project GetProject(int userId, ProjectDto project)
        {
            var projectToGet = (Project)(from p in _context.Projects
                             join s in _context.ProjectMemberships on p.Id equals s.ProjectId
                             where s.UserId == userId && p.Id == project.Id
                             select new Project { Name = p.Name, Id = p.Id, Created = p.Created });
            if (projectToGet is null)
            {
                throw new NotFoundException("Projec not found.");
            }
            return projectToGet!;
        }

        public void DeleteProject(int userId, ProjectDto project)
        {
            var projectToDelete = GetProjectIfAdmin(userId, project.Id!);
            _context.Projects.Remove(projectToDelete);
            _context.SaveChanges();
        }

        public Project UpdateProject(int userId, ProjectDto project)
        {
            Project projectToUpdate = GetProjectIfAdmin(userId, project.Id);
            projectToUpdate.Name = project.Name!;
            projectToUpdate.Updated = DateOnly.FromDateTime(DateTime.Now.Date);
            _context.Projects.Update(projectToUpdate);
            _context.SaveChanges();
            return projectToUpdate;
        }

        public async Task<Project> CreateProject(int userId, ProjectDto project)
        {
            var newProject = new Project() { Name = project.Name!, Created = DateOnly.FromDateTime(DateTime.Now.Date) };
            await _context.Projects.AddAsync(newProject);
            await _context.SaveChangesAsync();
            var settings = new ProjectMemberships() { UserId = userId, ProjectId = newProject.Id, Created = DateOnly.FromDateTime(DateTime.Now.Date) };
            await _context.AddAsync(settings);
            await _context.SaveChangesAsync();
            return newProject;
        }
        private Project GetProjectIfAdmin(int userId, int projectId)
        {
            var project = (from p in _context.Projects
                                    join s in _context.ProjectMemberships on p.Id equals s.ProjectId
                                    where s.UserId == userId && p.Id == projectId && s.Role == Role.Admin
                                    select new Project { Name = p.Name, Id = p.Id, Created = p.Created }).FirstOrDefault();

            if (project is null)
            {
                throw new NotFoundException("Projec not found or you don't have enought privilages.");
            }
            return project!;
        }
    }
}
