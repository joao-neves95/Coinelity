/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Coinelity.Core;

namespace Coinelity.AspServer.Middleware
{
    public class AppPasswordHasher<TUser> : PasswordHasher<TUser> where TUser : class
    {
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        ~AppPasswordHasher()
        {
            Dispose();
        }

        public override string HashPassword(TUser user, string password)
        {
            return DataHasher.HashData( password );
        }

        public override PasswordVerificationResult VerifyHashedPassword(TUser user, string hashedPassword, string providedPassword)
        {
            if ( VerifyHashedPassword(hashedPassword, providedPassword) )
                return PasswordVerificationResult.Success;

            return PasswordVerificationResult.Failed;
        }

        public static bool VerifyHashedPassword(string hashedPassword, string providedPassword)
        {
            return DataHasher.Compare(providedPassword, hashedPassword);
        }
    }
}
