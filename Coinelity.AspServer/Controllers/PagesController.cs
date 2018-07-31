using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Coinelity.AspServer.Controllers
{
    [Route("/")]
    public class PagesController : Controller
    {
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
                Console.WriteLine( e.Message );
                return NotFound();
            }
        }

        [HttpGet("/dashboard")]
        // TODO: Authorization.
        // [Authorize]
        public IActionResult GetPrivate()
        {
            try
            {
                Response.ContentType = "text/html";
                string index = Path.Combine(Directory.GetCurrentDirectory(), "WebClient", "dashboard.html");
                return PhysicalFile(index, "text/html");
            }
            catch (Exception e)
            {
                Console.WriteLine( e.Message );
                return NotFound();
            }
        }
    }
}
