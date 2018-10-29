/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coinelity.AspServer.Models
{
    public class PlaceOrderDTO
    {
        public int UserId { get; set; }

        public byte IsRealBalance { get; set; }

        public int AssetId { get; set; }

        public int OperationTypeId { get; set; }

        public int LifetimeId { get; set; }

        public decimal StrikePrice { get; set; }

        public float InvestmentAmount { get; set; }

        /// <summary>
        /// To be used when sending the place order success response.
        /// </summary>
        public int ActiveOrderId { get; set; }
    }
}
