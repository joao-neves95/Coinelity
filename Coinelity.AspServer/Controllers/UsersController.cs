using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Coinelity.AspServer.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;

namespace Coinelity.AspServer.Controllers
{
    // [Produces("application/json")]
    [Route("api/users")]
    public class UsersController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public UsersController(IConfiguration configuration, IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task Register([FromBody]RegisterDTO registerDTO)
        {
            if (!ModelState.IsValid)
                return;

            // TODO: Check if email already exists.
            ApplicationUser user = new ApplicationUser { Email = registerDTO.Email, Password = registerDTO.Password };
            user.IpAddress = _httpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();

            IdentityResult registerSuccess = await _userManager.CreateAsync(user);
            if (!registerSuccess.Succeeded)
                // TODO: Error handling.
                return;
        }
    }
}