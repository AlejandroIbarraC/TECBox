using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using AutoFixture.Kernel;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source;

namespace Server.Controllers
{
    [Route("administrator/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        [EnableCors("AnotherPolicy")]
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
        [EnableCors("AnotherPolicy")]
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
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public void insertPost([FromBody] Products product)
        {
            List<Products> productsList = new List<Products>();
            string fileName = "DataBase/products.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            productsList = JsonSerializer.Deserialize<List<Products>>(jsonString);

            List<Sellers> sellersList = new List<Sellers>();
            fileName = "DataBase/sellers.json";

            jsonString = System.IO.File.ReadAllText(fileName);
            sellersList = JsonSerializer.Deserialize<List<Sellers>>(jsonString);

            if (sellersList.Count > 0)
            {
                bool validation = true;
                for (int i = 0; i < productsList.Count; i++)
                {
                    if (productsList[i].barcode == product.barcode)
                    {
                        validation = false;
                        break;
                    }
                }
                bool validation2 = true;
                for (int i = 0; i < sellersList.Count; i++)
                {
                    if (sellersList[i].name == product.seller)
                    {
                        validation2 = true;
                        break;
                    }
                    else
                    {
                        validation2 = false;
                    }
                }
                if (validation & validation2)
                {
                    productsList.Add(product);

                    fileName = "DataBase/products.json";

                    jsonString = JsonSerializer.Serialize(productsList);
                    System.IO.File.WriteAllText(fileName, jsonString);

                    Debug.WriteLine("Product inserted");
                }
                else
                {
                    Debug.WriteLine("Product has a duplicate barcode or the seller doesn't exist");
                }
            }
            else
            {
                Debug.WriteLine("There aren't any sellers available at the moment");
            }
        }

        [Route("modify")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public void modifyPost([FromBody] Products product)
        {
            List<Products> productsList = new List<Products>();
            string fileName = "DataBase/products.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            productsList = JsonSerializer.Deserialize<List<Products>>(jsonString);

            bool validation = false;

            for (int i = 0; i < productsList.Count; i++)
            {
                if (productsList[i].barcode == product.barcode)
                {
                    productsList[i] = product;
                    Debug.WriteLine("Package modified");
                    validation = true;
                    break;
                }
            }

            if (validation)
            {
                jsonString = JsonSerializer.Serialize(productsList);
                System.IO.File.WriteAllText(fileName, jsonString);
            }
            else
            {
                Debug.WriteLine("Product not found");
            }
        }

        [Route("delete")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public void deletePost([FromBody] Products product)
        {
            List<Products> productsList = new List<Products>();
            string fileName = "DataBase/products.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            productsList = JsonSerializer.Deserialize<List<Products>>(jsonString);

            bool validation = false;

            for (int i = 0; i < productsList.Count; i++)
            {
                if (productsList[i].barcode == product.barcode)
                {
                    productsList.RemoveAt(i);
                    Debug.WriteLine("Package deleted");
                    validation = true;
                    break;
                }
            }

            if (validation)
            {
                jsonString = JsonSerializer.Serialize(productsList);
                System.IO.File.WriteAllText(fileName, jsonString);
            }
            else
            {
                Debug.WriteLine("Product not found");
            }
        }
    }
}
