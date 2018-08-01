using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coinelity.Core.Errors
{
    /// <summary>
    /// 
    /// This error messages are to be sent by the API controllers and shown as JSON to the client.
    /// 
    /// </summary>
    public class ErrorMessage
    {
        private readonly string ERROR;

        public ErrorMessage(ErrorType errorType)
        {
            switch (errorType)
            {
                case ErrorType.EmailAlreadyInUse:
                    ERROR = ErrorMessages.EmailAlreadyInUse;
                    break;
                case ErrorType.LoginError:
                    ERROR = ErrorMessages.LoginError;
                    break;
                case ErrorType.NotFound:
                    ERROR = ErrorMessages.NotFound;
                    break;
                case ErrorType.UnknownError:
                    ERROR = ErrorMessages.UnknownError;
                    break;
                default:
                    throw new Exception("Invalid ErrorType (??)");
            }
        }

        public string Error
        {
            get { return ERROR; }
        }
    }
}
