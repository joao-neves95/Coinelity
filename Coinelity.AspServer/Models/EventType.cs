using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coinelity.AspServer.Models
{
    public enum EventType
    {
        Register = 1,
        Login = 2,
        Failed_Login = 3,
        Password_Change = 4,
        Email_Change = 5,
        MaxLoginFailes_Change = 6,
    }
}
