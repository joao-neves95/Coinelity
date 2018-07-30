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
