using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coinelity.AspServer.Models
{
    public class ApplicationUserSettings
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public DateTime LastUpdate { get; set; }

        public bool TwoFactorEnabled { get; set; }

        public byte MaxLoginFailes { get; set; }

        public bool IsAffiliate { get; set; }
    }
}
