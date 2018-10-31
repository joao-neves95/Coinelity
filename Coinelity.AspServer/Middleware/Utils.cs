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
using System.IO;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Coinelity.AspServer.Enums;

namespace Coinelity.AspServer.Middleware
{
    public static class Utils
    {
        public static List<string> GetErrorsFromModelState(ModelStateDictionary modelState)
        {
            List<string> errors = new List<string>();

            foreach (ModelStateEntry value in modelState.Values)
            {
                for (int i = 0; i < value.Errors.Count; i++)
                {
                    errors.Add( value.Errors[i].ErrorMessage );
                }
            }

            return errors;
        }

        /// <summary>
        /// 
        /// Returns <null> if the a account type is not valid.
        /// 
        /// </summary>
        /// <param name="accountType"> UserAccountType string (pascal case) or JSON (camel case) representation </param>
        /// <returns></returns>
        public static UserAccountType UserAccountTypeResolver(byte isRealBalance)
        {
            return
                isRealBalance == 1 ? UserAccountType.RealBalance :
                isRealBalance == 0 ? UserAccountType.PaperBalance :
                UserAccountType.Unknown;
        }

        /// <summary>
        /// 
        /// Get the response content-type (MIME_type) based on the file to send.
        /// 
        /// </summary>
        /// <param name="fileType"> js/css/json/img </param>
        /// <param name="fileName"> The file name. </param>
        /// <returns>MIME_type</returns>
        /// <see cref="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types"/>
        public static string ContentTypeResolver(string fileType, string fileName)
        {
            switch (fileType)
            {
                case "js":
                    return "application/javascript";
                case "css":
                    return "text/css";
                case "json":
                    return "application/json";
                case "img":
                    string extension = Path.GetExtension(fileName).Replace(".", "");
                    if (extension == "svg")
                        extension += "+xml";

                    return $"image/{ extension }";
                default:
                    return null;
            }
        }

        /// <summary>
        /// 
        /// Get a value of a claim from the user's request JWT.
        /// 
        /// </summary>
        /// <param name="userClaims"> The object User from the controller. </param>
        /// <param name="claim"> A ClaimType value or a custom claim. </param>
        /// <returns></returns>
        public static string GetUserClaim(ClaimsPrincipal userClaims, string claim)
        {
            return userClaims.Claims.Where( c => c.Type == claim ).First().Value;
        }

        public static string GetUserIdClaim(ClaimsPrincipal userClaims)
        {
            return GetUserClaim( userClaims, "id" );
        }

        public static string GetUserIp(IHttpContextAccessor httpContextAccessor)
        {
            return httpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();
        }
    }
}
