using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Coinelity.AspServer.Middleware;
using Coinelity.AspServer.Models;
using Coinelity.AspServer.DataAccess;
using Coinelity.Core.Errors;

namespace Coinelity.AspServer.Controllers
{
    [Route("api/user")]
    [Produces("application/json")]
    public class UserController : Controller
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserController(IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> userManager)
        {
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]RegisterDTO registerDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(Json( Utils.GetErrorsFromModelState(ModelState) ).Value);

            // I need to create a new UserStore instance here because when _userManager is used the connection string gets disposed.
            // (and I would not be able to use it again)
            UserStore userStore = new UserStore();
            bool userExists = await userStore.ExistsByEmailAsync( registerDTO.Email );
            userStore.Dispose();

            if (userExists)
                return BadRequest(Json( new ErrorMessage(ErrorType.EmailAlreadyInUse) ).Value);

            ApplicationUser user = new ApplicationUser { Email = registerDTO.Email, Password = registerDTO.Password };
            // When in localhost it returns "::1".
            user.IpAddress = _httpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();

            IdentityResult registerSuccess = await _userManager.CreateAsync(user, user.Password);

            if (!registerSuccess.Succeeded)
                // TODO: Error handling.
                // return StatusCode( 500 );
                return StatusCode(500, registerSuccess.Errors.ToList());

            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginDTO loginDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(Json( Utils.GetErrorsFromModelState(ModelState) ));

            string userEmail = loginDTO.Email;
            UserStore userStore = new UserStore();

            // TODO: Set lockoutOnFailure based on the user settings.
            Microsoft.AspNetCore.Identity.SignInResult signInResult = await AppSignInManager.PasswordSignInAsync(userEmail, loginDTO.Password, false, false);

            if (!signInResult.Succeeded)
                return BadRequest(Json( new ErrorMessage(ErrorType.LoginError) ).Value);

            string userId = await userStore.GetUserIdByEmailAsync( userEmail );
            userStore.Dispose();

            return Ok(Json( new jwtDTO { AccessToken = JWTTokens.Generate(userEmail, userId) } ).Value);
        }

        [Authorize]
        [HttpGet("roles")]
        public async Task<IActionResult> Roles()
        {
            RoleStore roleStore = new RoleStore();
            List<ApplicationRoleDTO> applicationUserRoles = new List<ApplicationRoleDTO>();
            try
            {
                string userIdClaim = User.Claims.Where(c => c.Type == "id").First().Value;
                applicationUserRoles = await roleStore.GetUserRolesByUserIdAsync( userIdClaim );

                return Ok(Json( applicationUserRoles ).Value);
            }
            catch (Exception e)
            {
                // TODO: Exception handling.
                Console.WriteLine($"ERROR:\nIn: api/users/roles\n{ e.Message }");
                return StatusCode(500, Json( new ErrorMessage(ErrorType.UnknownError) ).Value);
            }
            finally
            {
                roleStore.Dispose();
            }
        }
    }
}
