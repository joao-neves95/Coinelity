using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coinelity.AspServer.Models
{
    public class ApplicationUser
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string NormalizedEmail { get; set; }

        public bool EmailConfirmed { get; set; }

        public string Password { get; set; }

        public string GoogleCode { get; set; }

        public string PhoneNumber { get; set; }

        public bool PhoneNumberConfirmed { get; set; }

        public bool LockoutEnabled { get; set; }

        public DateTime LockoutEnd { get; set; }

        public DateTime CreateDate { get; set; }

        // This is used for the AuditLog table.
        public string IpAddress { get; set; }
    }
}
