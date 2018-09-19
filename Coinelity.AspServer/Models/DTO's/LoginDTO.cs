/*********************************************************************************************
 *
 * Copyright (c) 2018 Jo�o Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Jo�o Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 *********************************************************************************************/

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Coinelity.AspServer.Models;
using Coinelity.Core.Errors;

namespace Coinelity.AspServer.Models
{
    public class LoginDTO
    {
        [Required(ErrorMessage = ErrorMessages.EmailFieldRequired)]
        public string Email { get; set; }

        [Required(ErrorMessage = ErrorMessages.PasswordFieldRequired)]
        public string Password { get; set; }
    }
}
