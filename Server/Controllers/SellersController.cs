using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source;

namespace Server.Controllers
{
    [Route("administrator/[controller]")]
    [ApiController]
    public class SellersController : ControllerBase
    {
        [EnableCors("AnotherPolicy")]
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
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public void insertPost([FromBody] Sellers seller)
        {
            List<Sellers> sellersList = new List<Sellers>();
            string fileName = "DataBase/sellers.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            sellersList = JsonSerializer.Deserialize<List<Sellers>>(jsonString);

            bool validation = true;

            for (int i = 0; i < sellersList.Count; i++)
            {
                if (sellersList[i].id == seller.id)
                {
                    validation = false;
                    break;
                }
            }

            if (validation)
            {
                sellersList.Add(seller);

                jsonString = JsonSerializer.Serialize(sellersList);
                System.IO.File.WriteAllText(fileName, jsonString);

                Debug.WriteLine("Seller inserted");
            }
            else
            {
                Debug.WriteLine("Seller has a duplicate id");
            }
        }

        [Route("modify")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public void modifyPost([FromBody] Sellers seller)
        {
            List<Sellers> sellersList = new List<Sellers>();
            string fileName = "DataBase/sellers.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            sellersList = JsonSerializer.Deserialize<List<Sellers>>(jsonString);

            bool validation = false;

            for (int i = 0; i < sellersList.Count; i++)
            {
                if (sellersList[i].id == seller.id)
                {
                    sellersList[i] = seller;
                    Debug.WriteLine("Seller modified");
                    validation = true;
                    break;
                }
            }

            if (validation)
            {
                jsonString = JsonSerializer.Serialize(sellersList);
                System.IO.File.WriteAllText(fileName, jsonString);
            }
            else
            {
                Debug.WriteLine("Seller not found");
            }
        }

        [Route("delete")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public void deletePost([FromBody] Sellers seller)
        {
            List<Sellers> sellersList = new List<Sellers>();
            string fileName = "DataBase/sellers.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            sellersList = JsonSerializer.Deserialize<List<Sellers>>(jsonString);

            bool validation = false;

            for (int i = 0; i < sellersList.Count; i++)
            {
                if (sellersList[i].id == seller.id)
                {
                    sellersList.RemoveAt(i);
                    Debug.WriteLine("Seller deleted");
                    validation = true;
                    break;
                }
            }

            if (validation)
            {
                jsonString = JsonSerializer.Serialize(sellersList);
                System.IO.File.WriteAllText(fileName, jsonString);
            }
            else
            {
                Debug.WriteLine("Seller not found");
            }
        }
    }
}
