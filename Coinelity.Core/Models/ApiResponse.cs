/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
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

        /// <summary>
        /// 
        /// Error API response. Example:
        /// <para/>
        /// {
        ///   "StatusCode": 400,
        ///   "StatusMessage": "Client Error",
        ///   "Errors": [
        ///     "Email already in use."
        ///   ],
        ///   "Data": []
        /// }
        /// 
        /// </summary>
        /// <param name="statusCode"></param>
        /// <param name="statusMessage"></param>
        /// <param name="errorMessage"> Defaults to "Unknown Error" </param>
        /// <param name="ignore"> Set to "null" to send this error response. </param>
        public ApiResponse(short? statusCode = null, string statusMessage = null, string errorMessage = "Unknown Error", string ignore = null )
        {
            this.StatusCode = (statusCode == null) ? 200 : statusCode;
            this.StatusMessage = (statusMessage == null) ? "Success" : statusMessage;
            this.Errors = new object[1] { errorMessage };
            this.Data = new object[0];
        }

        /// <summary>
        /// 
        /// Success API response. Example:
        /// <para/>
        /// {
        ///  "StatusCode": 201,
        ///  "StatusMessage": "Created",
        ///  "Errors": [],
        ///  "Data": [
        ///    {
        ///      "message": "User successfully registered."
        ///    }
        ///  ]
        /// }
        /// </summary>
        /// <param name="statusCode"></param>
        /// <param name="statusMessage"></param>
        /// <param name="successMessage"> Defaults to "Success" </param>
        public ApiResponse(short? statusCode = null, string statusMessage = null, string successMessage = "Success" )
        {
            this.StatusCode = (statusCode == null) ? 200 : statusCode;
            this.StatusMessage = (statusMessage == null) ? "Success" : statusMessage;
            this.Errors = new object[0];
            this.Data = new object[1] { new Dictionary<string, string> { { "message", successMessage } } };
        }

        public short? StatusCode { get; set; }

        public string StatusMessage { get; set; }

        // TODO: Change to string[].
        public object[] Errors { get; set; }

        // TODO: Change to string[].
        public object[] Data { get; set; }

        public string ToJSON()
        {
            return JsonConvert.SerializeObject( this, Formatting.Indented );
        }
    }
}
