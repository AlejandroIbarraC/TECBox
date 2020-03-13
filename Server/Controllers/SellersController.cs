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
    public class SellersController : ControllerBase
    {
        [HttpGet]
        public List<Sellers> getSellers()
        {
            List<Sellers> sellersList = new List<Sellers>();
            string fileName = "DataBase/sellers.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            sellersList = JsonSerializer.Deserialize<List<Sellers>>(jsonString);

            return sellersList;
        }

        [Route("insert")]
        [HttpPost]
        public void insertPost([FromBody] Sellers sellers)
        {
            Debug.WriteLine("Vendedor insertado");
        }

        [Route("modify")]
        [HttpPost]
        public void modifyPost([FromBody] Sellers sellers)
        {
            Debug.WriteLine("Vendedor modificado");
        }

        [Route("delete")]
        [HttpPost]
        public void deletePost([FromBody] Sellers sellers)
        {
            Debug.WriteLine("Vendedor eliminado");
        }
    }
}
