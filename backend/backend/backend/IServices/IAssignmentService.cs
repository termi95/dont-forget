using backend.Entities;
using backend.Model.Assignment;
using backend.Model.Task;

namespace backend.IServices
{
    public interface IAssignmentService
    {
        Task<List<Assignment>> GetAssignmentsForProjectAsync(int prjectId, int userId);
        Task<Assignment> GetAssignmentByIdAsync(int id, int userId);
        Task<bool> DeleteAssigmentByIdAsync(int id, int userId);
        Task<Assignment> CreateAssignmentAsync(AssignmentDto assignment, int userId);
        Task<bool> RenameAssignmentAsync(AssignmentDto assignment, int userId);
        Task<bool> TogleDoneAssignmentAsync(AssignmentDto assignment, int userId);
        Task<bool> ChangePriorityAssignmentAsync(AssignmentDto assignment, int userId);
        Task<bool> SetBodyAssignmentAsync(AssignmentDto assignment, int userId);
        Task<Assignment> GetPropertiesAssignmentAsync(AssignmentDto assignment, int userId);
        Task<bool> ChangeAssignmentDoer(AssignmentDto assignment, int userId);
        Task<CommentResponse> AddCommentsForAsignmentAsync(CommentDto comment, int userId);
        Task<List<CommentResponse>> GetCommentsForAsignmentAsync(CommentDto comment, int userId);
    }
}
