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
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Coinelity.AspServer.Middleware;
using Coinelity.AspServer.Models;
using Coinelity.AspServer.Enums;
using Coinelity.Core.Errors;

namespace Coinelity.AspServer.Controllers
{
    [Route("/")]
    public class PagesController : Controller
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public PagesController(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        [Route("/")]
        [Route("/home")]
        [Route("/index.html")]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                Response.ContentType = "text/html";
                string index = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html");
                return PhysicalFile(index, "text/html");
            }
            catch (Exception e)
            {
                // TODO: Error handling.
                Console.WriteLine( $"ERROR:\nIn: /\n{ e.Message }" );
                return NotFound();
            }
        }

        [Route( "/dashboard" )]
        [Route( "/settings" )]
        [Route( "/traderoom" )]
        [Route( "/trade-room/markets" )]
        [Route( "/trade-room/trade/{symbol}" )]
        [HttpGet]
        // [Authorize]
        public IActionResult GetPrivate()
        {
            try
            {
                Response.ContentType = "text/html";
                Response.Headers.Add( "Cache-Control", "no-cache, no-store" );
                Response.Headers.Add( "Expires", "-1" );
                Response.Cookies.Append( "Requested-Path", Request.Path.ToString() );
                string index = Path.Combine(Directory.GetCurrentDirectory(), "WebClient", "dashboard.html");
                return PhysicalFile(index, "text/html");
            }
            catch (Exception e)
            {
                // TODO: Error handling.
                Console.WriteLine($"ERROR:\nIn: /dashboard\n{ e.Message }");
                return NotFound( Json( new ErrorMessage( ErrorType.NotFound ) ).Value );
            }
        }

        [HttpGet("/public/{fileType}/{fileName}")]
        /// <summary>
        /// Get a public resource file.
        /// </summary>
        /// <param name="fileType"> js/css/json/img </param>
        /// <param name="fileName"> The file name. </param>
        public IActionResult GetPublicResource([FromRoute]string fileType, [FromRoute]string fileName)
        {
            return GetResource(ResourcePrivacyLevel.Public, fileType, fileName);
        }

        [HttpGet("/private/{fileType}/{fileName}")]
        // [Authorize]
        /// <summary>
        /// Get a private resource file.
        /// </summary>
        /// <param name="fileType"> js/css/json/img </param>
        /// <param name="fileName"> The file name. </param>
        public IActionResult GetPrivateResource([FromRoute]string fileType, [FromRoute]string fileName)
        {
            return GetResource( ResourcePrivacyLevel.Private, fileType, fileName );
        }

        private IActionResult GetResource(ResourcePrivacyLevel privacyLevel, string fileType, string fileName)
        {

            try
            {
                string folder = "wwwroot";
                if (privacyLevel == ResourcePrivacyLevel.Private)
                    folder = "WebClient";

                string contentType = Utils.ContentTypeResolver( fileType, fileName );

                Response.ContentType = contentType;
                string filePath = Path.Combine( Directory.GetCurrentDirectory(), folder, fileType, fileName );
                Console.WriteLine( filePath );
                return PhysicalFile( filePath, contentType );
            }
            catch (Exception e)
            {
                // TODO: Error handling.
                Console.WriteLine( e.Message );
                return NotFound( Json( new ErrorMessage( ErrorType.NotFound ) ).Value );
            }
        }
    }
}
