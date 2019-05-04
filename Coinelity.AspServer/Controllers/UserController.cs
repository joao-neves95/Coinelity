/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using Coinelity.AspServer.Middleware;
using Coinelity.AspServer.Models;
using Coinelity.AspServer.DataAccess;
using Coinelity.Core;
using Coinelity.Core.Errors;
using Coinelity.Core.Models;
using Coinelity.Core.Data;

// TODO: Add consistency to the JSON responses (**Successes**/Errors). Something like: { error: [], result: [] }
// TODO: Add try/catch.
// TODO: Update AuditLog table (change max password fails).
namespace Coinelity.AspServer.Controllers
{
    [Route("api/users")]
    [Produces("application/json")]
    public class UserController : Controller
    {
        const string AFFILIATE_TOKEN_KEY = "ReferrerAffiliateCode";

        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserController(IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> userManager)
        {
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
        }

        #region AUTH

        [HttpPost("register")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register([FromBody]RegisterDTO registerDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest( Json( Middleware.Utils.GetErrorsFromModelState( ModelState ) ).Value );

            bool userExists = false;

            // I need to create a new UserStore instance here because when _userManager is used the connection string gets disposed.
            // (and I would not be able to use it again)
            using (UserStore userStore = new UserStore())
            {
                userExists = await userStore.ExistsByEmailAsync( registerDTO.Email );
            }

            if (userExists)
                return BadRequest( new ApiResponse( 400, "Client Error", ErrorMessages.EmailAlreadyInUse, null ).ToJSON() );

            ApplicationUser user = new ApplicationUser { Email = registerDTO.Email, Password = registerDTO.Password };
            user.IpAddress = Middleware.Utils.GetUserIp( _httpContextAccessor );

            // TODO (MIDDLEWARE) Test affiliate (empty and populated) cookie on register.
            string affiliatedTo = _httpContextAccessor.HttpContext.Request.Cookies[AFFILIATE_TOKEN_KEY];
            using (UserStore userStore = new UserStore())
            {
                user.AffiliatedTo = await userStore.GetIdByAffiliateCodeAsync( affiliatedTo );
            }

            IdentityResult registerSuccess = await _userManager.CreateAsync( user, user.Password );

            if (!registerSuccess.Succeeded)
                // TODO: Error handling.
                // return StatusCode( 500 );
                return StatusCode( 500, new ApiResponse( 400, "Client Error", JsonConvert.SerializeObject( registerSuccess.Errors, Formatting.Indented ) ).ToJSON() );

            // Do not await. Ignore VS warning.
#pragma warning disable CS4014 // Because this call is not awaited, execution of the current method continues before the call is completed
            Task.Run( async () =>
            {
                AuditLogStore auditLogStore = null;
                UserStore userStore = null;
                string userId;

                try
                {
                    using (userStore = new UserStore())
                    {
                        userId = await userStore.GetIdByEmailAsync( registerDTO.Email );
                    }

                    using (auditLogStore = new AuditLogStore())
                    {
                        await auditLogStore.InsertNewLog( Convert.ToInt32( userId ), EventType.Register, Middleware.Utils.GetUserIp( _httpContextAccessor ) );
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine( $"Exception in \"/register\" - InsertNewLog():\n{e.Message}", e );
                }
                finally
                {
                    userStore?.Dispose();
                    auditLogStore?.Dispose();
                }
            } );
#pragma warning restore CS4014 // Because this call is not awaited, execution of the current method continues before the call is completed

            return StatusCode( 201, new ApiResponse( 201, "Created", "User successfully registered." ).ToJSON() );
        }

        [HttpPost("login")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login([FromBody]LoginDTO loginDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest( Json( Middleware.Utils.GetErrorsFromModelState( ModelState ) ).Value );

            string userEmail = loginDTO.Email;
            UserStore userStore = new UserStore();

            // TODO: Set lockoutOnFailure based on the user settings.
            Microsoft.AspNetCore.Identity.SignInResult signInResult = await AppSignInManager.PasswordSignInAsync(userEmail, loginDTO.Password, false, false);

            if (!signInResult.Succeeded)
                return BadRequest( Json( new ErrorMessage( ErrorType.LoginError ) ).Value );

            string userId = await userStore.GetIdByEmailAsync( userEmail );
            userStore.Dispose();

            // Do not await. Ignore VS warning.
#pragma warning disable CS4014 // Because this call is not awaited, execution of the current method continues before the call is completed
            Task.Run( async () =>
            {
                 AuditLogStore auditLogStore = null;

                 try
                 {
                     using (auditLogStore = new AuditLogStore())
                     {
                        // TODO: Get user IP.
                        await auditLogStore.InsertNewLog( Convert.ToInt32( userId ), EventType.Login, Middleware.Utils.GetUserIp( _httpContextAccessor ) );
                     }
                 }
                 catch (Exception e)
                 {
                     Console.WriteLine( $"Exception in \"/login\" - InsertNewLog():\n{e.Message}", e );
                 }
                 finally
                 {
                     auditLogStore?.Dispose();
                 }
            } );
#pragma warning restore CS4014 // Because this call is not awaited, execution of the current method continues before the call is completed

            return Ok( Json( new jwtDTO { AccessToken = JWTTokens.Generate( userEmail, userId ) } ).Value );
        }

        [Authorize]
        [HttpGet("authenticated")]
        public IActionResult Authenticated()
        {
            return Ok( Json( new { msg = "The user is authenticated." } ).Value );
        }

        [Authorize]
        [HttpGet("roles")]
        public async Task<IActionResult> GetRoles()
        {
            RoleStore roleStore = null;
            string userIdClaim;
            List<ApplicationRoleDTO> applicationUserRoles = new List<ApplicationRoleDTO>();

            try
            {
                using (roleStore = new RoleStore())
                {
                    userIdClaim = Middleware.Utils.GetUserIdClaim( User );
                }

                applicationUserRoles = await roleStore.GetUserRolesByUserIdAsync( userIdClaim );
                return Ok( Json( applicationUserRoles ).Value );
            }
            catch (Exception e)
            {
                // TODO: Exception handling.
                Console.WriteLine( $"ERROR:\nIn: api/users/roles\n{ e.Message }" );
                return StatusCode( 500, Json( new ErrorMessage( ErrorType.UnknownError ) ).Value );
            }
            finally
            {
                roleStore?.Dispose();
            }
        }

        #endregion

        #region SETTINGS

        // TODO: Test.
        /// <summary>
        /// 
        /// NOT TESTED.
        /// 
        /// </summary>
        /// <param name="setPasswordDTO"></param>
        /// <returns></returns>
        [Authorize]
        [ValidateAntiForgeryToken]
        [HttpPut("password")]
        public async Task<ApiResponse> PutPassword([FromBody]SetPasswordDTO setPasswordDTO)
        {
            if (!ModelState.IsValid)
                return new ApiResponse(400, ErrorMessages.BadRequest, Middleware.Utils.GetErrorsFromModelState( ModelState ).ToArray() );

            string userIdClaim = Middleware.Utils.GetUserIdClaim( User );
            UserStore userStore = new UserStore();
            SQLClientResult result;
            try
            {
                result = await userStore.ChangePasswordAsync( userIdClaim, setPasswordDTO.CurrentPassword, setPasswordDTO.NewPassword );

            }
            catch
            {
                return new ApiResponse( 500, ErrorMessages.UnknownError, ErrorMessages.UnknownError, null );
            }

            if (!result.Success)
            {
                return new ApiResponse( 400, ErrorMessages.BadRequest, result.ErrorMessages[0], null );
            }

            // Do not await. Ignore warning.
#pragma warning disable CS4014 // Because this call is not awaited, execution of the current method continues before the call is completed
            Task.Run( async () =>
            {
                AuditLogStore auditLogStore = null;

                try
                {
                    using (auditLogStore = new AuditLogStore())
                    {
                        await auditLogStore.InsertNewLog( Convert.ToInt32( userIdClaim ), EventType.Password_Change, Middleware.Utils.GetUserIp( _httpContextAccessor ) );
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine( $"Exception in \"/password\" - PutPassword():\n{e.Message}", e );
                }
                finally
                {
                    auditLogStore?.Dispose();
                }
            } );
#pragma warning restore CS4014 // Because this call is not awaited, execution of the current method continues before the call is completed

            return new ApiResponse( 200, "Ok", "Successfully changed the password" );
        }

        /// <summary>
        /// 
        /// NOT TESTED.
        /// 
        /// </summary>
        /// <param name="setMaxLoginFailsDTO"></param>
        /// <returns></returns>
        [Authorize]
        [ValidateAntiForgeryToken]
        [HttpPut("max-login-fails")]
        public async Task<IActionResult> PutMaxLoginFails([FromBody]SetMaxLoginFailsDTO setMaxLoginFailsDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest( Json( Middleware.Utils.GetErrorsFromModelState( ModelState ) ).Value );

            string userId = Middleware.Utils.GetUserIdClaim( User );

            UserStore userStore = new UserStore();
            int result = await userStore.SetMaxloginFailsAsync( userId, setMaxLoginFailsDTO.MaxLoginFails.ToString() );

            if (result <= 0)
                return StatusCode( 500, Json( new ErrorMessage( ErrorType.UnknownError ) ).Value );

            return Ok( Json( "Successfully changed the maximum number of failed logins." ).Value );
        }

        #endregion

        #region OPTIONS

        [Authorize]
        [HttpGet("active-options")]
        public async Task<IActionResult> GetActiveOptions()
        {
            OptionsStore optionsStore = null;
            List<ActiveOptionJoined> activeOptions = new List<ActiveOptionJoined>();

            try
            {
                int thisUserId = Convert.ToInt32( Middleware.Utils.GetUserIdClaim( User ) );

                using (optionsStore = new OptionsStore())
                {
                    activeOptions = await optionsStore.GetActiveOrdersAsync( thisUserId );
                }

                if (activeOptions.Count <= 0)
                    return NotFound( new ApiResponse( 400, "Not Found", "No active orders found", null ) );

                return Ok( new ApiResponse( 200, "Ok", null, activeOptions.ToArray() ) );
            }
            catch
            {
                return Ok( new ApiResponse( 500, "Unknown Error", "Unknown error.", null ) );
            }
            finally
            {
                optionsStore?.Dispose();
            }
        }

        #endregion

        [Authorize]
        [HttpGet("balances")]
        public async Task<ApiResponse> GetBalances()
        {
            string userIdClaim = Middleware.Utils.GetUserIdClaim( User );
            UserAccountStore userAccountStore = new UserAccountStore();

            try
            {
                using (userAccountStore)
                {
                    SQLClientResult userBalancesResult = await userAccountStore.GetBalancesAsync( Convert.ToInt32( userIdClaim ) );
                    return new ApiResponse( 200, "Success", null, userBalancesResult.QueryResult.ToJSON() );
                }
            }
            catch (Exception e)
            {
                Console.WriteLine( $"ERROR in UserController.GetBalances() \n{e.Message} \n{e.StackTrace}" );
                return new ApiResponse( 500, "Unknown Error", "Unknown Error", null );
            }
            finally
            {
                userAccountStore?.Dispose();
            }
        }

        [HttpGet("invite/{code}")]
        public void Invite(string code)
        {
            CookieOptions cookieOptions = new CookieOptions();
            cookieOptions.Expires = DateTime.UtcNow.AddDays( 30 );
            cookieOptions.SameSite = SameSiteMode.Strict;
            // Prevent client-side JS from accessing the cookie value.
            cookieOptions.HttpOnly = true;
            Response.Cookies.Append( AFFILIATE_TOKEN_KEY, code, cookieOptions );
            Response.Redirect( "/" );
        }

        [HttpGet("redeem-code/{id}")]
        public void RedeemCode( int id )
        {
            // Find the user.
            // Check what the code type does.
            // Implement effect.
        }
    }
}
