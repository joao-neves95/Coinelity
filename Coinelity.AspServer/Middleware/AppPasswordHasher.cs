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
