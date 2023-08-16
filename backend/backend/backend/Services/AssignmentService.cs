using backend.Entities;
using backend.Exceptions;
using backend.IServices;
using backend.Model.Task;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class AssignmentService : IAssignmentService
    {
        private readonly UserDbContext _context;
        public AssignmentService(UserDbContext context)
        {
            _context = context;
        }
        public async Task<bool> ChangePriorityAssignmentAsync(AssignmentDto assignment, int userId)
        {
            Assignment? toDo = await GetAssignmentToUpdateProp(userId, assignment.Id);
            if (toDo is null)
            {
                throw new NotFoundException("Assignment to delete not found.");
            }
            await _context.Assignments
               .Where(a => a.Id == toDo.Id)
               .ExecuteUpdateAsync(a => a.SetProperty(a => a.Priority, assignment.Priority));
            return true;
        }

        public async Task<Assignment> CreateAssignmentAsync(AssignmentDto assignment, int userId)
        {
            Assignment toDo = new()
            {
                CreationDate = DateTime.Now.Date,
                Done = false,
                FinishDate = null,
                Name = assignment.Name!,
                Priority = AssignmentEnum.
                Priority.Medium,
                ProjectId = assignment.ProjectId,
                Body = string.Empty,
                DoerId = userId,
            };

            await _context.Assignments.AddAsync(toDo);
            await _context.SaveChangesAsync();

            return toDo;
        }

        //public async Task<bool> ChangeAssignmentDoer(AssignmentDto assignment, int userId)
        //{

        //}

        public async Task<bool> DeleteAssigmentByIdAsync(int assignmenId, int userId)
        {
            Assignment? result = await GetAssignmentToUpdateProp(userId, assignmenId);
            if (result is null)
            {
                throw new NotFoundException("Assignment to delete not found.");
            }
            _context.Remove(result);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Assignment> GetAssignmentByIdAsync(int id, int userId)
        {
            return await (from a in _context.Assignments
                          join p in _context.Projects on a.ProjectId equals p.Id
                          join s in _context.ProjectMemberships on a.ProjectId equals s.ProjectId
                          where s.UserId == userId && a.Id == id
                          select new Assignment
                          {
                              Id = a.Id,
                              Name = a.Name,
                              Done = a.Done,
                              ProjectId = a.ProjectId,
                              Priority = a.Priority,
                              FinishDate = a.FinishDate,
                              Body = a.Body,
                              CreationDate = a.CreationDate,
                          }).FirstAsync();
        }

        public async Task<List<Assignment>> GetAssignmentsForProjectAsync(int prjectId, int userId)
        {
            return await (from a in _context.Assignments
                          join p in _context.Projects on a.ProjectId equals p.Id
                          join s in _context.ProjectMemberships on a.ProjectId equals s.ProjectId
                          where s.UserId == userId && p.Id == prjectId
                          orderby a.Name ascending
                          select new Assignment
                          {
                              Id = a.Id,
                              Name = a.Name,
                              Done = a.Done,
                              ProjectId = a.ProjectId,
                              Priority = a.Priority,
                              FinishDate = a.FinishDate,
                          }).ToListAsync();
        }

        public async Task<Assignment> GetPropertiesAssignmentAsync(AssignmentDto assignment, int userId)
        {
            Assignment toDo = await (from a in _context.Assignments
                                     join p in _context.Projects on a.ProjectId equals p.Id
                                     join s in _context.ProjectMemberships on a.ProjectId equals s.ProjectId
                                     where s.UserId == userId && a.Id == assignment.Id
                                     select new Assignment
                                     {
                                         Id = a.Id,
                                         Priority = a.Priority,
                                         Body = a.Body,
                                     }).FirstAsync();
            if (toDo is null)
            {
                throw new NotFoundException("Assignment properties not found.");
            }
            return toDo;
        }

        public async Task<bool> RenameAssignmentAsync(AssignmentDto assignment, int userId)
        {
            Assignment? toDo = await GetAssignmentToUpdateProp(userId, assignment.Id);
            if (toDo is null)
            {
                throw new NotFoundException("Assignment not found.");
            }
            await _context.Assignments
               .Where(a => a.Id == toDo.Id)
               .ExecuteUpdateAsync(a => a.SetProperty(a => a.Name, assignment.Name));
            return true;
        }

        public async Task<bool> SetBodyAssignmentAsync(AssignmentDto assignment, int userId)
        {
            Assignment? toDo = await GetAssignmentToUpdateProp(userId, assignment.Id);
            if (toDo is null)
            {
                throw new NotFoundException("Assignment not found.");
            }
            await _context.Assignments
               .Where(a => a.Id == toDo.Id)
               .ExecuteUpdateAsync(a => a.SetProperty(a => a.Body, assignment.Body));
            return true;
        }

        public async Task<bool> TogleDoneAssignmentAsync(AssignmentDto assignment, int userId)
        {
            Assignment? toDo = await GetAssignmentToUpdateProp(userId, assignment.Id);
            if (toDo is null)
            {
                throw new NotFoundException("Assignment not found.");
            }
            toDo.Done = assignment.Done;
            await _context.Assignments
                .Where(a => a.Id == toDo.Id)
                .ExecuteUpdateAsync(a => a.SetProperty(a => a.Done, assignment.Done));
            return true;
        }

        private async Task<Assignment?> GetAssignmentToUpdateProp(int userId, int assignmentId)
        {
            return await (
                 from a in _context.Assignments
                 join p in _context.Projects on a.ProjectId equals p.Id
                 join s in _context.ProjectMemberships on a.ProjectId equals s.ProjectId
                 where s.UserId == userId && a.Id == assignmentId
                 select new Assignment
                 {
                     Id = a.Id,
                 }).FirstOrDefaultAsync();
        }
    }
}