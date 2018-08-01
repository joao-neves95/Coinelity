using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coinelity.Core.Errors
{
    public enum ErrorType
    {
        EmailAlreadyInUse,
        LoginError,
        NotFound,
        UnknownError
    }
}
