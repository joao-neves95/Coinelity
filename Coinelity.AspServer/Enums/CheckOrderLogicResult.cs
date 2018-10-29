using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coinelity.AspServer.Enums
{
    public enum CheckOrderLogicResult
    {
        Profit,
        Loss,
        NotExpired,
        ErrorNotFound,
        ErrorUnknownExchange
    }
}
