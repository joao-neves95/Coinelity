using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coinelity.AspServer.Models
{
    public class ApiResponse
    {
        public object[] Errors { get; set; }

        public object[] Data { get; set; }
    }
}
