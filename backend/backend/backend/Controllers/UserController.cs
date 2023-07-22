using AutoMapper;
using backend.Model.User;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost, Route("login")]
        public ActionResult Post([FromBody] LoginUserDto user)
        {
            return Ok(_userService.Login(user));
        }

        [HttpPost, Route("register")]
        public ActionResult Post([FromBody] RegisterUserDto user)
        {
            _userService.Register(user);
            return Ok();
        }
    }
}
