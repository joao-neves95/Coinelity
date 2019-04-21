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
