using AutoMapper;
using backend.Entities;
using backend.Model.User;

namespace backend
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, RegisterUserDto>();
        }
    }
}
