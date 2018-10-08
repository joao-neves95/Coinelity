using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coinelity.AspServer.Models
{
    public class ActiveOption
    {
        public int OrderId { get; set; }

        public int UserId { get; set; }

        public int AssetId { get; set; }

        public int OperationTypeId { get; set; }

        public int LifetimeId { get; set; }

        public decimal StrikePrice { get; set; }

        public float InvestmentAmount { get; set; }

        public DateTime OpenTimestamp { get; set; }
    }
}
