using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coinelity.AspServer.Models
{
    public class PlaceOrderDTO
    {
        public int UserId { get; set; }

        public string AccountType { get; set; }

        public int AssetId { get; set; }

        public int OperationTypeId { get; set; }

        public int LifetimeId { get; set; }

        public decimal StrikePrice { get; set; }

        public float InvestmentAmount { get; set; }
    }
}
