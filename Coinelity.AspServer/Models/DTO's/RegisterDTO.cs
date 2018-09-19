﻿/*********************************************************************************************
 *
 * Copyright (c) 2018 Jo�o Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Jo�o Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 *********************************************************************************************/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Coinelity.AspServer.DataAccess;
using Coinelity.Core.Errors;

namespace Coinelity.AspServer.Models
{
    public class RegisterDTO
    {
        [Required(ErrorMessage = ErrorMessages.EmailFieldRequired)]
        [DataType(DataType.EmailAddress)]
        [EmailAddress(ErrorMessage = ErrorMessages.WrongEmailFormat)]
        public string Email { get; set; }

        [Required(ErrorMessage = ErrorMessages.PasswordFieldRequired)]
        [DataType(DataType.Password)]
        [StringLength(255, ErrorMessage = ErrorMessages.MinPasswordLength, MinimumLength = Env.MinPasswordLen)]
        public string Password { get; set; }

        public string IpAddress { get; set; }
    }
}
