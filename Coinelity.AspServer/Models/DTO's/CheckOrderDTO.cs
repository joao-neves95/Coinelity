using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coinelity.AspServer.Models
{
    public class CheckOrderDTO
    {
        public int OrderId { get; set; }

        public string AccountType { get; set; }
    }
}
