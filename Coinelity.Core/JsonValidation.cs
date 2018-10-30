using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Schema;
using Newtonsoft.Json.Schema.Generation;
using Newtonsoft.Json.Serialization;
using Coinelity.AspServer.Models;

namespace Coinelity.AspServer.Middleware
{
    public static class JsonValidation
    {
        public static JSchema GetSchema( Type type )
        {
            JSchemaGenerator generator = new JSchemaGenerator();
            generator.ContractResolver = new CamelCasePropertyNamesContractResolver();
            return generator.Generate( type );
        }

        public static JsonValidationResponse IsValid( Type schema, string json )
        {
            IList<string> errorMessages;
            bool isValidOrder = JObject.Parse( json ).IsValid( JsonValidation.GetSchema( schema ), out errorMessages );

            return new JsonValidationResponse( isValidOrder, errorMessages.ToArray() );
        }
    }

    public interface IJsonSchema
    {
    }
}
