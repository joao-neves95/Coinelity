/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Coinelity.Core.Models
{
    public class ApiResponse
    {
        /// <summary>
        /// 
        /// The API Response schema.
        /// 
        /// </summary>
        /// <param name="statusCode"> Defaults to 200 </param>
        /// <param name="statusMessage"> Defaults to "Success" </param>
        /// <param name="errors"></param>
        /// <param name="data"></param>
        public ApiResponse(short? statusCode = null, string statusMessage = null, object[] errors = null, object[] data = null)
        {
            this.StatusCode = ( statusCode == null ) ? 200 : statusCode;
            this.StatusMessage = ( statusMessage == null ) ? "Success" : statusMessage;
            this.Errors = (errors == null) ? new object[0] : errors;
            this.Data = (data == null) ? new object[0] : data;
        }

        public short? StatusCode { get; set; }

        public string StatusMessage { get; set; }

        public object[] Errors { get; set; }

        public object[] Data { get; set; }

        public string ToJSON()
        {
            return JsonConvert.SerializeObject( this, Formatting.Indented );
        }
    }
}
