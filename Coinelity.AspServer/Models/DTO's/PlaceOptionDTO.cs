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
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json.Schema;
using Newtonsoft.Json.Schema.Generation;
using Newtonsoft.Json.Serialization;
using Coinelity.AspServer.Middleware;

namespace Coinelity.AspServer.Models
{
    public class PlaceOptionDTO
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        [MinLength(1, ErrorMessage = "The isRealBalance property must be provided. Use 1 for true or 0 for false.", ErrorMessageResourceName = "userId")]
        [MaxLength(1, ErrorMessage = "The isRealBalance property must be provided. Use 1 for true or 0 for false.", ErrorMessageResourceName = "userId")]
        [Range(0, 1, ErrorMessage = "Invalid range. Use 1 for true or 0 for false.", ErrorMessageResourceName = "isRealBalance")]
        public byte UserAccountType { get; set; }

        [Required]
        public int AssetId { get; set; }

        [Required]
        public int OperationTypeId { get; set; }

        [Required]
        public int LifetimeId { get; set; }

        [Required]
        [Range(1, 9999999999999999999, ErrorMessage = "The minimum investment amount is 1.", ErrorMessageResourceName = "investmentAmount")]
        public float InvestmentAmount { get; set; }

        public decimal StrikePrice { get; set; }

        /// <summary>
        /// To be used when sending the place order success response.
        /// </summary>
        public int ActiveOptionId { get; set; }
    }
}
