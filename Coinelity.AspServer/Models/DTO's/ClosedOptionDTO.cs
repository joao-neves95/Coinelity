using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Coinelity.AspServer.Enums;

namespace Coinelity.AspServer.Models
{
    public class ClosedOptionDTO
    {
        public ClosedOptionDTO(ActiveOptionJoined activeOptionJoined )
        {

        }

        public int Id { get; set; }

        public int UserId { get; set; }

        public byte IsRealBalance { get; set; }

        public int OperationTypeId { get; set; }

        public int AssetId { get; set; }

        public string Symbol { get; set; }

        public string ExchangeName { get; set; }

        public int LifetimeId { get; set; }

        public int TimeMinutes { get; set; }

        public int LifetimeLabel { get; set; }

        public sbyte PayoutPercent { get; set; }

        public decimal StrikePrice { get; set; }

        public float InvestmentAmount { get; set; }

        public decimal ProfitLossFiat { get; set; }

        public DateTime OpenTimestamp { get; set; }

        // Closed Order properties:

        public decimal ClosePrice { get; set; }

        /// <summary>
        /// Without the user investment ammount.
        /// </summary>
        public decimal PayoutValue { get; set; }

        public UserAccountType UserAccountType { get; set; }

        public bool AddToBalance { get; set; }
    }
}
