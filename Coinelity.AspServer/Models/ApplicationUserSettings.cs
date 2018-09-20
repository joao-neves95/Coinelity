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

namespace Coinelity.AspServer.Models
{
    public class ApplicationUserSettings
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public DateTime LastUpdate { get; set; }

        public bool TwoFactorEnabled { get; set; }

        public byte MaxLoginFailes { get; set; }

        public bool IsAffiliate { get; set; }
    }
}
