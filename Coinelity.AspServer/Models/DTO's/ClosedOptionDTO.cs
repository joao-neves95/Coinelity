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
            this.Id = activeOptionJoined.Id;
            this.UserId = activeOptionJoined.UserId;
            this.IsRealBalance = activeOptionJoined.IsRealBalance;
            this.OperationTypeId = activeOptionJoined.OperationTypeId;
            this.AssetId = activeOptionJoined.AssetId;
            this.Symbol = activeOptionJoined.Symbol;
            this.ExchangeName = activeOptionJoined.ExchangeName;
            this.LifetimeId = activeOptionJoined.LifetimeId;
            this.TimeMinutes = activeOptionJoined.TimeMinutes;
            this.LifetimeLabel = activeOptionJoined.LifetimeLabel;
            this.PayoutPercent = activeOptionJoined.PayoutPercent;
            this.StrikePrice = activeOptionJoined.StrikePrice;
            this.InvestmentAmount = activeOptionJoined.InvestmentAmount;
            this.OpenTimestamp = activeOptionJoined.OpenTimestamp;
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

        public DateTime OpenTimestamp { get; set; }

        // Closed Order properties:

        /// <summary>
        /// 
        /// The investment amount plus the payout value in case of a profit, or 
        /// all the negative investment amount in case of a loss.
        /// To be set up server side.
        /// 
        /// </summary>
        public decimal ProfitLossFiat { get; set; }


        public decimal ClosePrice { get; set; }

        /// <summary>
        /// The payout value without the user investment amount.
        /// </summary>
        public decimal PayoutValue { get; set; }

        public UserAccountType UserAccountType { get; set; }

        /// <summary>
        /// Set up server side.
        /// </summary>
        public bool AddToBalance { get; set; }
    }
}
