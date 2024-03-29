﻿using backend.Entities;
using backend.Exceptions;
using backend.IServices;
using backend.Model.Assignment;
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
            if (!(await CheckIsUserIsMemberOfProject(assignment.Id, userId)))
            {
                throw new ForbiddenAccessException("User is not a project member.");
            }
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
            if (!(await CheckIsUserIsMemberOfProjectByProjectId(assignment.ProjectId, userId)))
            {
                throw new ForbiddenAccessException("User is not a project member.");
            }

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

        public async Task<bool> ChangeAssignmentDoer(AssignmentDto assignment, int userId)
        {
            if (!(await CheckIsUserIsMemberOfProject(assignment.Id, userId)))
            {
                throw new ForbiddenAccessException("User is not a project member.");
            }
            Assignment? toDo = await GetAssignmentToUpdateProp(userId, assignment.Id);
            if (toDo is null)
            {
                throw new NotFoundException("Assignment not found.");
            }
            await _context.Assignments
               .Where(a => a.Id == toDo.Id)
               .ExecuteUpdateAsync(a => a.SetProperty(a => a.DoerId, assignment.DoerId));
            return true;
        }

        public async Task<bool> DeleteAssigmentByIdAsync(int assignmenId, int userId)
        {
            if (!(await CheckIsUserIsMemberOfProject(assignmenId, userId)))
            {
                throw new ForbiddenAccessException("User is not a project member.");
            }
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
            if (!(await CheckIsUserIsMemberOfProject(id, userId)))
            {
                throw new ForbiddenAccessException("User is not a project member.");
            }
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

        public async Task<List<Assignment>> GetAssignmentsForProjectAsync(int projectId, int userId)
        {
            if (!(await CheckIsUserIsMemberOfProjectByProjectId(projectId, userId)))
            {
                throw new ForbiddenAccessException("User is not a project member.");
            }
            return await (from a in _context.Assignments
                          join p in _context.Projects on a.ProjectId equals p.Id
                          join s in _context.ProjectMemberships on a.ProjectId equals s.ProjectId
                          where s.UserId == userId && p.Id == projectId
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
            if (!(await CheckIsUserIsMemberOfProject(assignment.Id, userId)))
            {
                throw new ForbiddenAccessException("User is not a project member.");
            }
            Assignment toDo = await (from a in _context.Assignments
                                     join p in _context.Projects on a.ProjectId equals p.Id
                                     join s in _context.ProjectMemberships on a.ProjectId equals s.ProjectId
                                     where s.UserId == userId && a.Id == assignment.Id
                                     select new Assignment
                                     {
                                         Id = a.Id,
                                         Priority = a.Priority,
                                         Body = a.Body,
                                         DoerId = a.DoerId,
                                     }).FirstAsync();
            if (toDo is null)
            {
                throw new NotFoundException("Assignment properties not found.");
            }
            return toDo;
        }

        public async Task<bool> RenameAssignmentAsync(AssignmentDto assignment, int userId)
        {
            if (!(await CheckIsUserIsMemberOfProject(assignment.Id, userId)))
            {
                throw new ForbiddenAccessException("User is not a project member.");
            }
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
            if (!(await CheckIsUserIsMemberOfProject(assignment.Id, userId)))
            {
                throw new ForbiddenAccessException("User is not a project member.");
            }
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
            if (!(await CheckIsUserIsMemberOfProject(assignment.Id, userId)))
            {
                throw new ForbiddenAccessException("User is not a project member.");
            }
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

        public async Task<List<CommentResponse>> GetCommentsForAsignmentAsync(CommentDto comment, int userId)
        {
            if (!(await CheckIsUserIsMemberOfProject(comment.AssignmentId, userId)))
            {
                throw new ForbiddenAccessException("User is not a project member.");
            }

            return await (from c in _context.Comments
                          join u in _context.Users on c.UserId equals u.Id
                          where c.AssignmentId == comment.AssignmentId
                          select new CommentResponse { Id = c.Id, Added = c.Added, User = u.Email, Message = c.Message }).ToListAsync();
        }
        public async Task<CommentResponse> AddCommentsForAsignmentAsync(CommentDto comment, int userId)
        {
            if (!(await CheckIsUserIsMemberOfProject(comment.AssignmentId, userId)))
            {
                throw new ForbiddenAccessException("User is not a project member.");
            }
            if (string.IsNullOrEmpty(comment.Message))
            {
                throw new BadRequestException("You can't add yourself.");
            }
            var Comment = new Comment
            {
                Added = DateTime.Now,
                Message = comment.Message,
                UserId = userId,
                AssignmentId = comment.AssignmentId
            };
            await _context.Comments.AddAsync(Comment);
            await _context.SaveChangesAsync();

            return await (from c in _context.Comments
            join u in _context.Users on c.UserId equals u.Id
            where c.Id == Comment.Id
            select new CommentResponse { Id = c.Id, Added = c.Added, User = u.Email, Message = c.Message }).SingleAsync();
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

        private async Task<bool> CheckIsUserIsMemberOfProject(int assignmentId, int userId)
        {
            var assignment = await _context.Assignments.FirstOrDefaultAsync((x) => x.Id == assignmentId);
            if (assignment is null) { throw new NotFoundException("Assignment not found."); }
            return await _context.ProjectMemberships.AnyAsync((x) => x.ProjectId == assignment.ProjectId && x.UserId == userId);
        }
        private async Task<bool> CheckIsUserIsMemberOfProjectByProjectId(int projectId, int userId)
        {
            var member = await _context.ProjectMemberships.FirstOrDefaultAsync((x) => x.ProjectId == projectId && x.UserId == userId);
            if (member is null) { throw new NotFoundException("User is not a member of that project."); }
            return true;
        }
    }
}