using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using AutoFixture.Kernel;
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

        [Route("popularity")]
        [HttpPost]
        public List<Products> getProductsByPopularity([FromBody] Products dates)
        {
            List<Products> productsList = new List<Products>();
            List<Products> middleList = new List<Products>();
            List<Products> finalList = new List<Products>();
            string fileName = "DataBase/products.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            productsList = JsonSerializer.Deserialize<List<Products>>(jsonString);

            if (productsList.Count != 0)
            {
                int[] beginDate = Auxiliar.getDateInArray(dates.entryDate);
                int[] endDate = Auxiliar.getDateInArray(dates.name);

                for (int i = 0; i < productsList.Count; i++)
                {
                    int[] productDate = Auxiliar.getDateInArray(productsList[i].entryDate);
                    if (beginDate[2] < productDate[2] & productDate[2] < endDate[2])
                    {
                        middleList.Add(productsList[i]);
                    }
                    else if (beginDate[2] == productDate[2])
                    {
                        if (beginDate[0] < productDate[0])
                        {
                            middleList.Add(productsList[i]);
                        }
                        else if (beginDate[0] == productDate[0])
                        {
                            if (beginDate[1] <= productDate[1])
                            {
                                middleList.Add(productsList[i]);
                            }
                        }
                    }
                    else if (productDate[2] == endDate[2])
                    {
                        if (productDate[0] < endDate[0])
                        {
                            middleList.Add(productsList[i]);
                        }
                        else if (productDate[0] == endDate[0])
                        {
                            if (productDate[1] <= endDate[1])
                            {
                                middleList.Add(productsList[i]);
                            }
                        }
                    }
                }
                if (middleList.Count != 0)
                {
                    var products = from element in middleList
                                        orderby element.sales
                                        select element;
                    foreach (Products product in products)
                    {
                        finalList.Add(product);
                    }
                    finalList.Reverse();
                    return finalList;
                }
                else
                {
                    return finalList;
                }
            }
            else
            {
                return finalList;
            }            
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
