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

namespace Coinelity.Core.Errors
{
    /// <summary>
    /// 
    /// The error messages constants.
    /// 
    /// </summary>
    public static class ErrorMessages
    {
        public const string EmailAlreadyInUse = "Email already in use.";

        public const string EmailFieldRequired = "The Email field is required.";

        public const string WrongEmailFormat = "Wrong email format.";

        public const string PasswordFieldRequired = "The Password field is required.";

        public const string MinPasswordLength = "The Password must have at least 8 characters.";

        public const string ProvidedPassDoesNotMatch = "The provided password does not match the current password.";

        public const string CouldNotChangePassword = "There was an error while changing the password.";

        public const string LoginError = "Wrong email or password.";

        public const string WrongAccountType = "Wrong account type ( send: \"realBalance\" or \"paperBalance\" ).";

        public const string InsufficientFunds = "Not enough funds to complete the operation.";

        public const string UnknownExchange = "Unknown exchange name. The provided exchange name is not valid or not supported by Coinelity.";

        public const string NotFound = "Not Found";

        public const string BadRequest = "Bad Request";

        public const string UnknownError = "Unknown error.";
    }
}
