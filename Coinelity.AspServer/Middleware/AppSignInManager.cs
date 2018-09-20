/*
 *
 * Copyright (c) 2018 Jo�o Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Jo�o Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using Coinelity.AspServer.DataAccess;
using Coinelity.AspServer.Middleware;
using Coinelity.AspServer.Models;

namespace Coinelity.AspServer.Middleware
{
    public static class AppSignInManager
    {

        /// <summary>
        /// User sign in. 
        /// <para />
        /// NOT YET IMPLEMENTED: "lockoutOnFailure"
        /// </summary>
        /// <param name="userName">The user email from a form or request body</param>
        /// <param name="password">The provided non-hashed user password from a form or request body</param>
        /// <param name="isPersistent">JWT's are not stored nor cached on the backend, only front end.</param>
        /// <param name="lockoutOnFailure">NOT YET IMPLEMENTED</param>
        /// <returns></returns>
        public static async Task<SignInResult> PasswordSignInAsync(string userName, string password, bool isPersistent, bool lockoutOnFailure)
        {
            // TODO: Implement lockoutOnFailure.
            // TODO: Add the results to the AuditLog table.
            UserStore userStore = new UserStore();

            try
            {
                string hashedPassword = await userStore.GetUserPasswordByEmailAsync( userName );
                // User doesn't exist.
                if (hashedPassword == null)
                    return SignInResult.Failed;

                bool validPassword = AppPasswordHasher<ApplicationUser>.VerifyHashedPassword(hashedPassword, password);
                if (!validPassword)
                    return SignInResult.Failed;

                return SignInResult.Success;
            }
            catch (Exception e)
            {
                // TODO: Exception handling.
                Console.WriteLine($"ERROR:\nOn: AppSignInManager.PasswordSignInAsync()\n{ e.Message }");
                return SignInResult.Failed;
            }
            finally
            {
                userStore.Dispose();
            }
        }
    }
}
