using backend.IServices;
using backend.Model.Project;
using backend.Model.ProjectMemberships;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : Controller
    {
        private readonly IProjectService _projectService;
        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet, Route("Projects"), Authorize]
        public ActionResult Get()
        {
            int userId = Convert.ToInt32(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Ok(_projectService.GetAllProjects(userId));
        }

        [HttpGet, Route(""), Authorize]
        public ActionResult GetProject([FromBody] ProjectDto project)
        {
            int userId = Convert.ToInt32(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Ok(_projectService.GetProject(userId, project));
        }


        [HttpPost, Route(""), Authorize]
        public async Task<ActionResult> CreateProject([FromBody] ProjectDto project)
        {
            int userId = Convert.ToInt32(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Ok(await _projectService.CreateProject(userId, project));
        }

        [HttpDelete, Route(""), Authorize]
        public ActionResult DeleteProject([FromBody] ProjectDto project)
        {
            int userId = Convert.ToInt32(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            _projectService.DeleteProject(userId, project);
            return Ok();
        }

        [HttpPatch, Route(""), Authorize]
        public ActionResult ChangeProjectName([FromBody] ProjectDto project)
        {
            int userId = Convert.ToInt32(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Ok(_projectService.UpdateProject(userId, project));
        }

        [HttpPost, Route("get-members"), Authorize]
        public async Task<ActionResult> GetUsersInProject([FromBody] ProjectDto project)
        {
            int userId = Convert.ToInt32(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Ok(await _projectService.GetUsersInProject(userId, project));
        }

        [HttpDelete, Route("delete-member"), Authorize]
        public async Task<ActionResult> DeleteMemberFromProject([FromBody] RemoveProjectMemberDto member)
        {
            int userId = Convert.ToInt32(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Ok(await _projectService.DeleteMemberFromProject(userId, member));
        }

        [HttpPatch, Route("member"), Authorize]
        public async Task<ActionResult> ChangeUserRoleInProject([FromBody] ChangeMemberRoleDto member)
        {
            int userId = Convert.ToInt32(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Ok(await _projectService.ChangeUserRoleInProject(userId, member));
        }

        [HttpPost, Route("add-member"), Authorize]
        public async Task<ActionResult> AddUserInProject([FromBody] AddProjectMemberDto member)
        {
            int userId = Convert.ToInt32(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Ok(await _projectService.AddMemberToProject(userId, member));
        }
    }
}
