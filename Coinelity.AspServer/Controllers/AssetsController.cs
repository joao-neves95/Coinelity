/**
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
using Microsoft.AspNetCore.Mvc;
using Coinelity.AspServer.DataAccess;
using Coinelity.Core.Models;

namespace Coinelity.AspServer.Controllers
{
    [Route("api/assets")]
    [Produces("application/json")]
    public class AssetsController : Controller
    {
        [HttpGet]
        public void GetAll()
        {
            AssetStore assetStore;
            using ( assetStore = new AssetStore() )
            {
                IList<Dictionary<string, object>>> assets = await assetStore.GetAll();

                if ( assets.Count <= 0 )
                    return new ApiResponse( null, null, null, null );

                return new ApiResponse( null, null, null, assets );
            }
        }
    }
}

