﻿/*
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

namespace Coinelity.AspServer.Models
{
    public class JsonValidationResponse
    {
        public JsonValidationResponse(bool isValid, string[] errorMessages)
        {
            this.IsValid = isValid;
            this.ErrorMessages = errorMessages;
        }

        public bool IsValid { get; set; }

        public string[] ErrorMessages { get; set; }
    }
}
