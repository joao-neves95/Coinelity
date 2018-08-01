using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coinelity.Core.Errors
{
    public static class ErrorMessages
    {
        public const string EmailAlreadyInUse = "Email already in use.";

        public const string EmailFieldRequired = "The Email field is required.";

        public const string WrongEmailFormat = "Wrong email format.";

        public const string PasswordFieldRequired = "The Password field is required.";

        public const string MinPasswordLength = "The Password must have at least 8 characters.";

        public const string LoginError = "Wrong email or password.";

        public const string NotFound = "Not Found";

        public const string UnknownError = "Unknown error.";
    }
}
