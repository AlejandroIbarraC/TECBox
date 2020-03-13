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
    [Route("warehouse/[controller]")]
    [ApiController]
    public class PackagesController : ControllerBase
    {
        [HttpGet]
        public List<Packages> getPackages()
        {
            List<Packages> packagesList = new List<Packages>();
            string fileName = "DataBase/packages.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            packagesList = JsonSerializer.Deserialize<List<Packages>>(jsonString);

            return packagesList;
        }

        [Route("insert")]
        [HttpPost]
        public void insertPost([FromBody] Packages packages)
        {
            Debug.WriteLine("Paquete insertado");
        }

        [Route("modify")]
        [HttpPost]
        public void modifyPost([FromBody] Packages packages)
        {
            Debug.WriteLine("Paquete modificado");
        }

        [Route("delete")]
        [HttpPost]
        public void deletePost([FromBody] Packages packages)
        {
            Debug.WriteLine("Paquete eliminado");
        }
    }
}
