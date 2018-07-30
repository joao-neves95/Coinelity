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
        public override string HashPassword(TUser user, string password)
        {
            return DataHasher.HashData( password );
        }

        public override PasswordVerificationResult VerifyHashedPassword(TUser user, string hashedPassword, string providedPassword)
        {
            if ( DataHasher.Compare(providedPassword, hashedPassword) )
                return PasswordVerificationResult.Success;

            return PasswordVerificationResult.Failed;
        }
    }
}
