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
    public class ApplicationUserAccount
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public decimal RealBalance { get; set; }

        public decimal PaperBalance { get; set; }

        public int Points { get; set; }
    }
}
