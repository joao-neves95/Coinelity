using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coinelity.AspServer.Models
{
    public class ApiResponse
    {
        public ApiResponse(short statusCode, string statusMessage, object[] errors, object[] data)
        {
            this.StatusCode = statusCode;
            this.StatusMessage = StatusMessage;
            this.Errors = errors;
            this.Data = data;
        }

        public short StatusCode { get; set; }

        public string StatusMessage { get; set; }

        public object[] Errors { get; set; }

        public object[] Data { get; set; }
    }
}
