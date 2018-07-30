using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
    }
}
