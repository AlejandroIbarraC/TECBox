using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source;

namespace Server.Controllers
{
    [Route("administrator/[controller]")]
    [ApiController]
    public class RoutesController : ControllerBase
    {
        [HttpGet]
        public List<Routes> getRoutes()
        {
            List<Routes> routesList = new List<Routes>();
            string fileName = "DataBase/routes.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            routesList = JsonSerializer.Deserialize<List<Routes>>(jsonString);

            return routesList;
        }

        [Route("insert")]
        [HttpPost]
        public void insertPost([FromBody] Routes routes)
        {
            Debug.WriteLine("Ruta insertada");
        }

        [Route("modify")]
        [HttpPost]
        public void modifyPost([FromBody] Routes routes)
        {
            Debug.WriteLine("Ruta modificada");
        }

        [Route("delete")]
        [HttpPost]
        public void deletePost([FromBody] Routes routes)
        {
            Debug.WriteLine("Ruta eliminada");
        }
    }
}
