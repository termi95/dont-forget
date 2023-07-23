using backend.Entities;
using backend.Exceptions;
using backend.IServices;
using backend.Model.Project;
using backend.Model.ProjectMemberships;
using Microsoft.EntityFrameworkCore;
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

        public async Task<List<ProjectMembersDto>> GetUsersInProject(int userId, ProjectDto project)
        {
            return await (
                        from m in _context.ProjectMemberships
                        join u in _context.Users on m.UserId equals u.Id
                        where 
                            m.ProjectId == project.Id
                            && 1 == (
                                    from m in _context.ProjectMemberships
                                    where 
                                        m.UserId == userId &&
                                        m.ProjectId == project.Id &&
                                        m.Role == Role.Admin
                                    select 1
                                    ).FirstOrDefault()
                          select new ProjectMembersDto()
                               {
                                   Id = m.Id,
                                   UserId = m.UserId,
                                   Role = m.Role,
                                   Created = m.Created,
                                   Email = u.Email,
                                   Name = u.Name,
                               }).ToListAsync();
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
