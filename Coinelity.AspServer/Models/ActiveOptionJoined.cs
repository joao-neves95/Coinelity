using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coinelity.AspServer.Models
{
    public class ActiveOptionJoined
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string Symbol { get; set; }

        public string ExchangeName { get; set; }

        public int OperationTypeId { get; set; }

        public int Lifetime { get; set; }

        public short PayoutPercent { get; set; }

        public decimal StrikePrice { get; set; }

        public float InvestmentAmount { get; set; }

        public DateTime OpenTimestamp { get; set; }
    }
}
