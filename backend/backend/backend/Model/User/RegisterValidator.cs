using backend.Entities;
using FluentValidation;

namespace backend.Model.User
{
    public class RegisterValidator : AbstractValidator<RegisterUserDto>
    {
        public RegisterValidator(UserDbContext dbContext)
        {
            RuleFor(i => i.Email).NotEmpty().EmailAddress().MaximumLength(128);
            RuleFor(i => i.Password).MinimumLength(8);
            RuleFor(i => i.Name).MinimumLength(3).MaximumLength(32);

            RuleFor(i => i.Email).
                Custom((value, context) =>
                {
                    if (dbContext.Users.Any(u => u.Email == value))
                    {
                        context.AddFailure("Email", "That email is taken");
                    }
                });
        }
    }
}
