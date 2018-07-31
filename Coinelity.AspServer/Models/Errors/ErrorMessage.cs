using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coinelity.AspServer.Models
{
    public class ErrorMessage
    {
        private readonly string ERROR;

        public ErrorMessage(ErrorType errorType)
        {
            switch (errorType)
            {
                case ErrorType.EmailAlreadyInUse:
                    ERROR = "Email already in use.";
                    break;
                case ErrorType.LoginError:
                    ERROR = "Wrong email or password.";
                    break;
                case ErrorType.NotFound:
                    ERROR = "Not Found";
                    break;
                case ErrorType.UnknownError:
                    ERROR = "Unknown error.";
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
