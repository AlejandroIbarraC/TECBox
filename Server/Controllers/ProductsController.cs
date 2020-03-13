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
    public class ProductsController : ControllerBase
    {
        [HttpGet]
        public List<Products> getProducts()
        {
            List<Products> productsList = new List<Products>();
            string fileName = "DataBase/products.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            productsList = JsonSerializer.Deserialize<List<Products>>(jsonString);

            return productsList;
        }

        [Route("insert")]
        [HttpPost]
        public void insertPost([FromBody] Products products)
        {
            Debug.WriteLine("Producto insertado");
        }

        [Route("modify")]
        [HttpPost]
        public void modifyPost([FromBody] Products products)
        {
            Debug.WriteLine("Producto modificado");
        }

        [Route("delete")]
        [HttpPost]
        public void deletePost([FromBody] Products products)
        {
            Debug.WriteLine("Producto eliminado");
        }
    }
}
