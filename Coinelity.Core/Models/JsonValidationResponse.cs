using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coinelity.AspServer.Models
{
    public class JsonValidationResponse
    {
        public JsonValidationResponse(bool isValid, string[] errorMessages)
        {
            this.IsValid = isValid;
            this.ErrorMessages = errorMessages;
        }

        public bool IsValid { get; set; }

        public string[] ErrorMessages { get; set; }
    }
}
