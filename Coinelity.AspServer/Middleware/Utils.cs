using System;
using System.IO;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;

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
    }
}
