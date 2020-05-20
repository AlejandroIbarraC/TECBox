using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;
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
        /// <summary>
        /// Function in charge of recopilating all the products in the database
        /// </summary>
        /// <returns>
        /// A JSON with the list of products in the database
        /// </returns>
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

        /// <summary>
        /// Function in charge of recopilating the most popular products base on dates
        /// </summary>
        /// <param name="dates">
        /// A product with the interval of dates
        /// </param>
        /// <returns>
        /// A JSON with the list of popular products
        /// </returns>
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

                if (beginDate[0] > 31 | beginDate[0] < 1 | beginDate[1] > 12 | beginDate[1] < 1 | endDate[0] > 31 | endDate[0] < 1 | endDate[1] > 12 | endDate[1] < 1)
                {
                    return finalList;
                }

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
                    createReport(finalList);
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

        /// <summary>
        /// Function in charge of finding a product with it's barcode
        /// </summary>
        /// <param name="product">
        /// A product with the barcode
        /// </param>
        /// <returns>
        /// A JSON with the found product
        /// </returns>
        [Route("getProduct")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public Products getProduct([FromBody] Products product)
        {
            List<Products> productsList = new List<Products>();
            string fileName = "DataBase/products.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            productsList = JsonSerializer.Deserialize<List<Products>>(jsonString);

            bool validation = false;

            Products found = null;

            for (int i = 0; i < productsList.Count; i++)
            {
                if (productsList[i].barcode == product.barcode)
                {
                    found = productsList[i];
                    validation = true;
                    break;
                }
            }
            if (validation)
            {
                return found;
            }
            else
            {
                return new Products("null", "null", "null", "null", "null", "null", "null", "null", "null"); ;
            }
        }

        /// <summary>
        /// Function in charge of finding a product with it's name
        /// </summary>
        /// <param name="product"></param>
        /// <returns>
        /// A JSON with the found product
        /// </returns>
        [Route("getProductFromName")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public Products getProductFromName([FromBody] Products product)
        {
            List<Products> productsList = new List<Products>();
            string fileName = "DataBase/products.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            productsList = JsonSerializer.Deserialize<List<Products>>(jsonString);

            bool validation = false;

            Products found = null;

            for (int i = 0; i < productsList.Count; i++)
            {
                if (productsList[i].name == product.name)
                {
                    found = productsList[i];
                    validation = true;
                    break;
                }
            }
            if (validation)
            {
                return found;
            }
            else
            {
                return new Products("null", "null", "null", "null", "null", "null", "null", "null", "null"); ;
            }
        }

        /// <summary>
        /// Function in charge of inserting a product in the database
        /// </summary>
        /// <param name="product">
        /// Product to be added
        /// </param>
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

        /// <summary>
        /// Function in charge of modifying a product in the database
        /// </summary>
        /// <param name="product">
        /// Product to be modified
        /// </param>
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

        /// <summary>
        /// Function in charge of deleting a product in the database
        /// </summary>
        /// <param name="product">
        /// Product to be deleted
        /// </param>
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

        /// <summary>
        /// Function in charge of creating a xml from an array
        /// </summary>
        /// <param name="products">
        /// Array of the most popular products
        /// </param>
        public void createReport(List<Products> products)
        {
            XmlSerializer serializer = new XmlSerializer(typeof(List<Products>));
            TextWriter writer = new StreamWriter("ReportsData/Popularity.xml");
            serializer.Serialize(writer, products);
            writer.Close();
        }
    }
}
