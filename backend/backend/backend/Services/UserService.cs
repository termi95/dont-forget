using backend.Entities;
using backend.Exceptions;
using backend.Model.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Services
{
    public interface IUserService
    {
        void Register(RegisterUserDto user);
        string Login(LoginUserDto dto);
    }
    public class UserService : IUserService
    {
        private readonly UserDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly AuthenticationSettings _authenticationSettings;
        public UserService(UserDbContext context, IPasswordHasher<User> passwordHasher, AuthenticationSettings authenticationSettings)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _authenticationSettings = authenticationSettings;
        }

        public async void Register(RegisterUserDto dto)
        {
            var user = new User()
            {
                Email = dto.Email,
                Name = dto.Name,
            };

            var hashedPassword = _passwordHasher.HashPassword(user, dto.Password);

            user.Password = hashedPassword;

            await _context.Users.AddAsync(user);
            _context.SaveChanges();
            DateOnly dateOnly = DateOnly.FromDateTime(DateTime.Now.Date);
            var project = new Project() { Created = dateOnly, Name = "Default" };

            await _context.Projects.AddAsync(project);
            _context.SaveChanges();
            await _context.ProjectMemberships.AddAsync(
                new ProjectMemberships() {
                    ProjectId = project.Id,
                    UserId = user.Id,
                    Role = Model.ProjectMemberships.ProjectMembershipsEnum.Role.Admin,
                    Created = dateOnly,
                    Updated = dateOnly,
                });
            _context.SaveChanges();
            await _context.Assignments.AddAsync(
                new Assignment() {
                    Body = string.Empty,
                    Done = false,
                    CreationDate = DateTime.Now,
                    Name = "Your first Task",
                    Priority = Model.Task.AssignmentEnum.Priority.Medium,
                    ProjectId = project.Id
                });
            _context.SaveChanges();
        }

        public string Login(LoginUserDto dto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);
            if (user is null)
            {
                throw new BadRequestException("User or password are incorrect.");
            }

            if (_passwordHasher.VerifyHashedPassword(user, user.Password, dto.Password) is PasswordVerificationResult.Failed)
            {
                throw new BadRequestException("User or password are incorrect.");
            }

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name.ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey!));
            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
            var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);

            var token = new JwtSecurityToken(_authenticationSettings.JwtIssuer,
                _authenticationSettings.JwtIssuer,
                claims,
                expires: expires,
                signingCredentials: signingCredentials);

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);
        }
    }
}
