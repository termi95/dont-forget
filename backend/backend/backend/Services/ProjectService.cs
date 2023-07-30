using AutoMapper.Execution;
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
        private readonly int minimalNumberOfAdminInProject = 1;
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
            _context.ProjectMemberships.Where(m => m.ProjectId == projectToDelete.Id).ExecuteDelete();
            _context.Assignments.Where(a => a.ProjectId == projectToDelete.Id).ExecuteDelete();
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
        private async Task<ProjectMembersDto> GetUsersInProject(int userId, int projectId)
        {
            return await (
                        from m in _context.ProjectMemberships
                        join u in _context.Users on m.UserId equals u.Id
                        where
                            m.ProjectId == projectId
                            && m.UserId == userId
                        select new ProjectMembersDto()
                        {
                            Id = m.Id,
                            UserId = m.UserId,
                            Role = m.Role,
                            Created = m.Created,
                            Email = u.Email,
                            Name = u.Name,
                        }).SingleAsync();
        }

        public async Task<bool> DeleteMemberFromProject(int userId, RemoveProjectMemberDto member)
        {
            await CheckIfUserIsAdminForProject(userId, member.ProjectId);

            await CheckMinimalNumberOfAdminsInProject(member.ProjectId);

            int rows = await _context.ProjectMemberships.Where(m => m.UserId == member.UserId && m.ProjectId == member.ProjectId).ExecuteDeleteAsync();
            return rows > 0;
        }

        public async Task<ProjectMembersDto> AddMemberToProject(int userId, AddProjectMemberDto member)
        {
            User? user = await _context.Users.Where(u => u.Email == member.Email).SingleOrDefaultAsync();
            if (user is null)
            {
                throw new NotFoundException("User not Found.");
            }
            if (userId == user.Id)
            {
                throw new BadRequestException("You can't add yourself.");
            }

            await CheckIfUserIsAdminForProject(userId, member.ProjectId);
            ProjectMemberships? memberExist = await _context.ProjectMemberships.Where(u=>u.UserId == user.Id && u.ProjectId == member.ProjectId).SingleOrDefaultAsync();
            if (memberExist is not null)
            {
                throw new NotAllowedExeption("User is already in project.");
            }

            ProjectMemberships newMember = new() { 
                Created = DateOnly.FromDateTime(DateTime.Now.Date),
                Updated = DateOnly.FromDateTime(DateTime.Now.Date),
                ProjectId = member.ProjectId,
                UserId = user.Id,
                Role = member.Role
            };

            await _context.ProjectMemberships.AddAsync(newMember);
            await _context.SaveChangesAsync();
            return await GetUsersInProject(newMember.UserId, newMember.ProjectId);
        }

        public async Task<bool> ChangeUserRoleInProject(int userId, ChangeMemberRoleDto member)
        {
            await CheckIfUserIsAdminForProject(userId, member.ProjectId);

            ProjectMemberships? memberToChangeRole = await _context.ProjectMemberships.Where(m => m.UserId == member.UserId && m.ProjectId== member.ProjectId).FirstOrDefaultAsync();

            if (memberToChangeRole is null) { throw new NotFoundException("User not Found"); }

            if (member.Role is Role.User && memberToChangeRole.Role is Role.Admin)
            {
                await CheckMinimalNumberOfAdminsInProject(member.ProjectId);
            }

            await _context.ProjectMemberships
               .Where(m => m.UserId == member.UserId)
               .ExecuteUpdateAsync(m => m.SetProperty(m => m.Role, member.Role));

            return true;
        }
        private async Task<bool> CheckMinimalNumberOfAdminsInProject(int ProjectId)
        {
            int checkNumberOfAdminInProject = await _context.ProjectMemberships.Where(m => m.ProjectId == ProjectId && m.Role == Role.Admin).CountAsync();
            if (checkNumberOfAdminInProject <= minimalNumberOfAdminInProject)
            {
                throw new NotAllowedExeption($"The project must have at least {minimalNumberOfAdminInProject} admin.");
            }
            return true;
        }
        private async Task<bool> CheckIfUserIsAdminForProject(int userId, int projectId)
        {
            int? isAdmin = await _context.ProjectMemberships.Where(m => m.UserId == userId && m.ProjectId == projectId && m.Role == Role.Admin).Select((u) => u.Id).SingleOrDefaultAsync();
            if (isAdmin is null)
            {
                throw new ForbiddenAccessException("User must be an admin to perform this action.");
            }
            return true;
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
