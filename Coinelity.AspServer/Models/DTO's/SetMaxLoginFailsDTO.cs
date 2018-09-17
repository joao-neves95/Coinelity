using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Coinelity.AspServer.Models
{
    public class SetMaxLoginFailsDTO
    {
        [Required]
        public int MaxLoginFails { get; set; }
    }
}
