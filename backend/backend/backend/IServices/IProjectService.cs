using backend.Entities;
using backend.Model.Project;
using backend.Model.ProjectMemberships;

namespace backend.IServices
{
    public interface IProjectService
    {
        public List<Project> GetAllProjects(int userId);

        public Project GetProject(int userId, ProjectDto project);

        public void DeleteProject(int userId, ProjectDto project);

        public Project UpdateProject(int userId, ProjectDto project);

        public Task<Project> CreateProject(int userId, ProjectDto project);
        public Task<List<ProjectMembersDto>> GetUsersInProject(int userId, ProjectDto project);
        public Task<bool> DeleteMemberFromProject(int userId, RemoveProjectMemberDto member);
        public Task<ProjectMembersDto> AddMemberToProject(int userId, AddProjectMemberDto member);
        public Task<bool> ChangeUserRoleInProject(int userId, ChangeMemberRoleDto member);
    }
}
