using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;
using Coinelity.AspServer.Middleware;
using Coinelity.AspServer.Models;
using Microsoft.AspNetCore.Authorization;
using Coinelity.AspServer.DataAccess;

namespace Coinelity.AspServer.Controllers
{
    // [Produces("application/json")]
    [Route("api/user")]
    public class UserController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public UserController(IConfiguration configuration, IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [Produces("application/json")]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]RegisterDTO registerDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(Json( Utils.GetErrorsFromModelState(ModelState) ));

            // I need to create a new UserStore instance here becouse if I user _userManager MSSQLClient will dispose of everything.
            // (and I would not be able to use it again)
            UserStore userStore = new UserStore();
            bool userExists = await userStore.ExistsByEmailAsync( registerDTO.Email );
            userStore.Dispose();

            if (userExists)
                return BadRequest(Json( new ErrorMessage(ErrorType.EmailAlreadyInUse) ));

            ApplicationUser user = new ApplicationUser { Email = registerDTO.Email, Password = registerDTO.Password };
            // TODO: Fix IP Address (returning "::1").
            user.IpAddress = _httpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();
            // this.Request.HttpContext.Connection.RemoteIpAddress;

            IdentityResult registerSuccess = await _userManager.CreateAsync(user, user.Password);

            if (!registerSuccess.Succeeded)
                // TODO: Error handling.
                // return StatusCode( 500 );
                return StatusCode(500, registerSuccess.Errors.ToList());

            return Ok();
        }

        [Produces("application/json")]
        [Authorize]
        [HttpGet("roles")]
        public async Task<IActionResult> Roles()
        {
            RoleStore roleStore = new RoleStore();
            List<ApplicationRoleDTO> applicationUserRoles = new List<ApplicationRoleDTO>();
            try
            {
                // TODO: Get user roles by user id instead of by email (faster).
                applicationUserRoles = await roleStore.GetUserRolesByUserEmailAsync( User.Identity.Name );

                return Ok(Json( applicationUserRoles ));
            }
            catch (Exception e)
            {
                // TODO: Exception handling.
                Console.WriteLine($"ERROR:\nOn: api/users/roles\n{ e.Message }");
                return StatusCode(500, Json( new ErrorMessage(ErrorType.UnknownError )));
            }
            finally
            {
                roleStore.Dispose();
            }
        }
    }
}
