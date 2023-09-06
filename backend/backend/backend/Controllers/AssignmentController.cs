using backend.IServices;
using backend.Model.Assignment;
using backend.Model.Project;
using backend.Model.Task;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentController : Controller
    {
        private readonly IAssignmentService _assignmentService;
        public AssignmentController(IAssignmentService assignmentService)
        {
            _assignmentService = assignmentService;
        }
        [HttpPost, Route("tasks"), Authorize]
        public async Task<ActionResult> GetAssignmentsForProject([FromBody] ProjectDto project)
        {
            int userId = Convert.ToInt32(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Ok(await _assignmentService.GetAssignmentsForProjectAsync(project.Id, userId));
        }
        [HttpPost, Route("task"), Authorize]
        public async Task<ActionResult> GetAssignment([FromBody] AssignmentDto assignment)
        {
            int userId = Convert.ToInt32(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Ok(await _assignmentService.GetAssignmentByIdAsync(assignment.Id, userId));
        }
        [HttpPost, Route("create"), Authorize]
        public async Task<ActionResult> CreateAssignment([FromBody] AssignmentDto assignmentDto)
        {
            int userId = Convert.ToInt32(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Ok(await _assignmentService.CreateAssignmentAsync(assignmentDto, userId));
        }
        [HttpPost, Route("delete"), Authorize]
        public async Task<ActionResult> DeleteAssignment([FromBody] AssignmentDto assignment)
        {
            int userId = Convert.ToInt32(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Ok(await _assignmentService.DeleteAssigmentByIdAsync(assignment.Id, userId));
        }
        [HttpPatch, Route("rename"), Authorize]
        public async Task<ActionResult> RenameAssignment([FromBody] AssignmentDto assignment)
        {
            int userId = Convert.ToInt32(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Ok(await _assignmentService.RenameAssignmentAsync(assignment, userId));
        }
        [HttpPatch, Route("togleDone"), Authorize]
        public async Task<ActionResult> TogleDoneAssignment([FromBody] AssignmentDto assignment)
        {
            int userId = Convert.ToInt32(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Ok(await _assignmentService.TogleDoneAssignmentAsync(assignment,userId));
        }
        [HttpPatch, Route("priority"), Authorize]
        public async Task<ActionResult> PriorityAssignment([FromBody] AssignmentDto assignment)
        {
            int userId = Convert.ToInt32(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Ok(await _assignmentService.ChangePriorityAssignmentAsync(assignment,userId));
        }
        [HttpPatch, Route("properties"), Authorize]
        public async Task<ActionResult> PropertiesAssignment([FromBody] AssignmentDto assignment)
        {
            int userId = Convert.ToInt32(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Ok(await _assignmentService.SetBodyAssignmentAsync(assignment,userId));
        }
        [HttpPost, Route("get-properties"), Authorize]
        public async Task<ActionResult> GetPropertiesAssignment([FromBody] AssignmentDto assignment)
        {
            int userId = Convert.ToInt32(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Ok(await _assignmentService.GetPropertiesAssignmentAsync(assignment,userId));
        }
        [HttpPatch, Route("doer"), Authorize]
        public async Task<ActionResult> DoerAssignment([FromBody] AssignmentDto assignment)
        {
            int userId = Convert.ToInt32(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Ok(await _assignmentService.ChangeAssignmentDoer(assignment, userId));
        }
        [HttpPost, Route("add-comment"), Authorize]
        public async Task<ActionResult> AddCommentAssignment([FromBody] CommentDto comment)
        {
            int userId = Convert.ToInt32(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Ok(await _assignmentService.AddCommentsForAsignmentAsync(comment, userId));
        }
        [HttpPost, Route("get-comment"), Authorize]
        public async Task<ActionResult> GetCommentAssignment([FromBody] CommentDto comment)
        {
            int userId = Convert.ToInt32(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Ok(await _assignmentService.GetCommentsForAsignmentAsync(comment, userId));
        }
    }
}
