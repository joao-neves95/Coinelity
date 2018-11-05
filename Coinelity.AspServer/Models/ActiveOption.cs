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

namespace Coinelity.AspServer.Models
{
    public class ActiveOption
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int AssetId { get; set; }

        public int IsRealBalance { get; set; }

        public int OperationTypeId { get; set; }

        public int LifetimeId { get; set; }

        public byte PayoutPercent { get; set; }

        public decimal StrikePrice { get; set; }

        public float InvestmentAmount { get; set; }

        public DateTime OpenTimestamp { get; set; }
    }
}
