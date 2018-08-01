using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Coinelity.AspServer.Models;
using Coinelity.Core.Errors;

namespace Coinelity.AspServer.Models
{
    public class LoginDTO
    {
        [Required(ErrorMessage = ErrorMessages.EmailFieldRequired)]
        public string Email { get; set; }

        [Required(ErrorMessage = ErrorMessages.PasswordFieldRequired)]
        public string Password { get; set; }
    }
}
