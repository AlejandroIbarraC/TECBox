using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Xml.Serialization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source;

namespace Server.Controllers
{
    [Route("warehouse/[controller]")]
    [ApiController]
    public class PackagesController : ControllerBase
    {
        /// <summary>
        /// Function in charge of recopilating all the packages in the database
        /// </summary>
        /// <returns>
        /// A JSON with the list of packages in the database
        /// </returns>
        [EnableCors("AnotherPolicy")]
        [HttpGet]
        public List<Packages> getPackages()
        {
            List<Packages> packagesList = new List<Packages>();
            string fileName = "DataBase/packages.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            packagesList = JsonSerializer.Deserialize<List<Packages>>(jsonString);

            return packagesList;
        }

        /// <summary>
        /// Function in charge of searching a package with it's tracking id
        /// </summary>
        /// <param name="searchPackage">
        /// Package with the tracking id
        /// </param>
        /// <returns>
        /// A JSON with the package found
        /// </returns>
        [Route("tracking")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public Packages getInfoFromTrackingNumber([FromBody] Packages searchPackage)
        {
            List<Packages> packagesList = new List<Packages>();
            string fileName = "DataBase/packages.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            packagesList = JsonSerializer.Deserialize<List<Packages>>(jsonString);

            Packages package = null;
            for (int i = 0; i < packagesList.Count; i++)
            {
                if (packagesList[i].trackingID == searchPackage.trackingID)
                {
                    package = packagesList[i];
                }
            }
            if (package != null)
            {
                return package;
            }
            else
            {
                package = new Packages("null", "null", "null", "null", "null", "null", "null");
                return package;
            }
        }

        /// <summary>
        /// Function in charge of recopilating all delivered packages between two different dates
        /// </summary>
        /// <param name="dates">
        /// Package with the dates
        /// </param>
        /// <returns>
        /// A JSON with the list of delivered packages between the dates
        /// </returns>
        [Route("delivered")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public List<Packages> getDeliveredPackages([FromBody] Packages dates)
        {
            List<Packages> packagesList = new List<Packages>();
            List<Packages> middleList = new List<Packages>();
            List<Packages> middleList2 = new List<Packages>();
            List<Packages> middleList3 = new List<Packages>();
            List<List<Packages>> middleList4 = new List<List<Packages>>();
            List<Packages> finalList = new List<Packages>();
            string fileName = "DataBase/packages.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            packagesList = JsonSerializer.Deserialize<List<Packages>>(jsonString);

            if (packagesList.Count != 0)
            {
                int[] beginDate = Auxiliar.getDateInArray(dates.client);
                int[] endDate = Auxiliar.getDateInArray(dates.deliveryDate);

                if (beginDate[0] > 31 | beginDate[0] < 1 | beginDate[1] > 12 | beginDate[1] < 1 | endDate[0] > 31 | endDate[0] < 1 | endDate[1] > 12 | endDate[1] < 1)
                {
                    return finalList;
                }

                for (int i = 0; i < packagesList.Count; i++)
                {
                    int[] packageDate = Auxiliar.getDateInArray(packagesList[i].deliveryDate);
                    if (beginDate[2] < packageDate[2] & packageDate[2] < endDate[2])
                    {
                        middleList.Add(packagesList[i]);
                    }
                    else if (beginDate[2] == packageDate[2])
                    {
                        if (beginDate[0] < packageDate[0])
                        {
                            middleList.Add(packagesList[i]);
                        }
                        else if (beginDate[0] == packageDate[0])
                        {
                            if (beginDate[1] <= packageDate[1])
                            {
                                middleList.Add(packagesList[i]);
                            }
                        }
                    }
                    else if (packageDate[2] == endDate[2])
                    {
                        if (packageDate[0] < endDate[0])
                        {
                            middleList.Add(packagesList[i]);
                        }
                        else if (packageDate[0] == endDate[0])
                        {
                            if (packageDate[1] <= endDate[1])
                            {
                                middleList.Add(packagesList[i]);
                            }
                        }
                    }
                }
                if (middleList.Count != 0)
                {
                    for (int i = 0; i < middleList.Count; i++)
                    {
                        if (middleList[i].status == "Delivered")
                        {
                            middleList2.Add(middleList[i]);
                        }
                    }
                    if (middleList2.Count != 0)
                    {
                        var packages = from element in middleList2
                                       orderby element.deliveryMan
                                       select element;
                        foreach (Packages package in packages)
                        {
                            middleList3.Add(package);
                        }
                        int i = 0;
                        int pivot;
                        while (i < middleList3.Count)
                        {
                            middleList = new List<Packages>();
                            middleList.Add(middleList3[i]);
                            i++;
                            if (i == middleList3.Count)
                            {
                                middleList4.Add(middleList);
                                break;
                            }
                            else
                            {
                                pivot = i - 1;
                                while (i < middleList3.Count)
                                {
                                    if (middleList3[pivot].deliveryMan == middleList3[i].deliveryMan)
                                    {
                                        middleList.Add(middleList3[i]);
                                        i++;
                                    }
                                    else
                                    {
                                        break;
                                    }
                                    
                                }
                                middleList4.Add(middleList);
                            }
                        }
                        for (i = 0; i < middleList4.Count; i++)
                        {
                            packages = from element in middleList4[i]
                                           orderby DateTime.Parse(element.deliveryDate)
                                           select element;
                            foreach (Packages package in packages)
                            {
                                finalList.Add(package);
                            }
                        }
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
            else
            {
                return finalList;
            }
        }

        /// <summary>
        /// Function in charge of searching all the packages that belongs to an user
        /// </summary>
        /// <param name="user">
        /// The user that is the owner of the packages
        /// </param>
        /// <returns>
        /// A JSON with the list of packages that belong to the user
        /// </returns>
        [Route("userPackages")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public List<Packages> getUserPackages([FromBody] Users user)
        {
            List<Packages> packagesList = new List<Packages>();
            List<Packages> finalPackagesList = new List<Packages>();
            string fileName = "DataBase/packages.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            packagesList = JsonSerializer.Deserialize<List<Packages>>(jsonString);

            for (int i = 0; i < packagesList.Count; i++)
            {
                if (user.name == packagesList[i].client)
                {
                    finalPackagesList.Add(packagesList[i]);
                }
            }

            return finalPackagesList;
        }

        /// <summary>
        /// Function in charge of searching all the packages that an employee is in charge to deliver
        /// </summary>
        /// <param name="employee">
        /// Employee that is in charge of delivering the packages
        /// </param>
        /// <returns>
        /// A JSON with the list of packages that are in charge of the employee
        /// </returns>
        [Route("employeePackages")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public List<Packages> getEmployeePackages([FromBody] Employees employee)
        {
            List<Packages> packagesList = new List<Packages>();
            List<Packages> finalPackagesList = new List<Packages>();
            string fileName = "DataBase/packages.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            packagesList = JsonSerializer.Deserialize<List<Packages>>(jsonString);

            for (int i = 0; i < packagesList.Count; i++)
            {
                if (employee.name == packagesList[i].deliveryMan)
                {
                    finalPackagesList.Add(packagesList[i]);
                }
            }

            return finalPackagesList;
        }

        /// <summary>
        /// Function in charge of inserting a package in the database
        /// </summary>
        /// <param name="package">
        /// Package to be added
        /// </param>
        [Route("insert")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public void insertPost([FromBody] Packages package)
        {
            List<Packages> packagesList = new List<Packages>();
            string fileName = "DataBase/packages.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            packagesList = JsonSerializer.Deserialize<List<Packages>>(jsonString);

            List<Routes> routesList = new List<Routes>();
            fileName = "DataBase/routes.json";

            jsonString = System.IO.File.ReadAllText(fileName);
            routesList = JsonSerializer.Deserialize<List<Routes>>(jsonString);

            List<Employees> employeesList = new List<Employees>();
            fileName = "DataBase/employees.json";

            jsonString = System.IO.File.ReadAllText(fileName);
            employeesList = JsonSerializer.Deserialize<List<Employees>>(jsonString);

            if (routesList.Count > 0 & employeesList.Count > 0)
            {
                bool validation = true;
                for (int i = 0; i < packagesList.Count; i++)
                {
                    if (packagesList[i].trackingID == package.trackingID)
                    {
                        validation = false;
                        break;
                    }
                }
                bool validation2 = true;
                for (int i = 0; i < routesList.Count; i++)
                {
                    if (routesList[i].number == package.route)
                    {
                        validation2 = true;
                        break;
                    }
                    else
                    {
                        validation2 = false;
                    }
                }
                bool validation3 = true;
                for (int i = 0; i < employeesList.Count; i++)
                {
                    if (employeesList[i].name == package.deliveryMan & employeesList[i].department == "Delivery")
                    {
                        validation3 = true;
                        break;
                    }
                    else
                    {
                        validation3 = false;
                    }
                        
                }
                if (validation & validation2 & validation3)
                {
                    packagesList.Add(package);

                    fileName = "DataBase/packages.json";

                    jsonString = JsonSerializer.Serialize(packagesList);
                    System.IO.File.WriteAllText(fileName, jsonString);

                    Debug.WriteLine("Package inserted");
                }
                else
                {
                    Debug.WriteLine("Package has a duplicate id, the route doesn't exist, or the delivery man doesn't exist");
                }
            }
            else
            {
                Debug.WriteLine("There aren't routes or deliver men available at the moment");
            }
        }

        /// <summary>
        /// Function in charge of adding a recently bought product to the packages database
        /// </summary>
        /// <param name="newPackages">
        /// Package to be added
        /// </param>
        [Route("boughtPackages")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public void newPackage([FromBody] List<Packages> newPackages)
        {
            List<Packages> packagesList = new List<Packages>();
            string fileName = "DataBase/packages.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            packagesList = JsonSerializer.Deserialize<List<Packages>>(jsonString);

            List<Routes> routesList = new List<Routes>();
            fileName = "DataBase/routes.json";

            jsonString = System.IO.File.ReadAllText(fileName);
            routesList = JsonSerializer.Deserialize<List<Routes>>(jsonString);

            List<Employees> employeesList = new List<Employees>();
            fileName = "DataBase/employees.json";

            jsonString = System.IO.File.ReadAllText(fileName);
            employeesList = JsonSerializer.Deserialize<List<Employees>>(jsonString);

            string employee = "";

            if (routesList.Count > 0 & employeesList.Count > 0)
            {
                bool validation = false;

                for (int i = 0; i < employeesList.Count; i++)
                {
                    if (employeesList[i].department == "Delivery")
                    {
                        validation = true;
                        employee = employeesList[i].name;
                        break;
                    }

                }

                if (validation)
                {
                    for (int i = 0; i < newPackages.Count; i++)
                    {
                        int trackingID = 5000;
                        for (int j = 0; j < packagesList.Count; j++)
                        {
                            if (packagesList[j].trackingID == trackingID.ToString())
                            {
                                trackingID += 100;
                                j = 0;
                            }
                        }

                        newPackages[i].trackingID = trackingID.ToString();
                        Random random = new Random();
                        int chosenNumber = random.Next(0, routesList.Count - 1);
                        newPackages[i].route = routesList[chosenNumber].number;
                        newPackages[i].deliveryMan = employee;

                        addSale(newPackages[i].description);

                        packagesList.Add(newPackages[i]);
                    }
                    fileName = "DataBase/packages.json";

                    jsonString = JsonSerializer.Serialize(packagesList);
                    System.IO.File.WriteAllText(fileName, jsonString);
                }
                else
                {
                    Debug.WriteLine("There are no delivery men available at the moment");
                }
            }
            else
            {
                Debug.WriteLine("There aren't routes or deliver men available at the moment");
            }
        }

        /// <summary>
        /// Function in charge of modifying a package in the database
        /// </summary>
        /// <param name="package">
        /// Package to be modified
        /// </param>
        [Route("modify")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public void modifyPost([FromBody] Packages package)
        {
            List<Packages> packagesList = new List<Packages>();
            string fileName = "DataBase/packages.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            packagesList = JsonSerializer.Deserialize<List<Packages>>(jsonString);

            bool validation = false;

            for (int i = 0; i < packagesList.Count; i++)
            {
                if (packagesList[i].trackingID == package.trackingID)
                {
                    packagesList[i] = package;
                    Debug.WriteLine("Package modified");
                    validation = true;
                    break;
                }
            }

            if (validation)
            {
                jsonString = JsonSerializer.Serialize(packagesList);
                System.IO.File.WriteAllText(fileName, jsonString);
            }
            else
            {
                Debug.WriteLine("Package not found");
            }
        }

        /// <summary>
        /// Function in charge of deleting a package in the database
        /// </summary>
        /// <param name="package">
        /// Package to be deleted
        /// </param>
        [Route("delete")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public void deletePost([FromBody] Packages package)
        {
            List<Packages> packagesList = new List<Packages>();
            string fileName = "DataBase/packages.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            packagesList = JsonSerializer.Deserialize<List<Packages>>(jsonString);

            bool validation = false;

            for (int i = 0; i < packagesList.Count; i++)
            {
                if (packagesList[i].trackingID == package.trackingID)
                {
                    packagesList.RemoveAt(i);
                    Debug.WriteLine("Package deleted");
                    validation = true;
                    break;
                }
            }

            if (validation)
            {
                jsonString = JsonSerializer.Serialize(packagesList);
                System.IO.File.WriteAllText(fileName, jsonString);
            }
            else
            {
                Debug.WriteLine("Package not found");
            }
        }

        /// <summary>
        /// Function in charge of increasing the sales of a product
        /// </summary>
        /// <param name="productName">
        /// The name of the product
        /// </param>
        public static void addSale(String productName)
        {
            List<Products> productsList = new List<Products>();
            string fileName = "DataBase/products.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            productsList = JsonSerializer.Deserialize<List<Products>>(jsonString);

            bool validation = false;

            for (int i = 0; i < productsList.Count; i++)
            {
                if (productsList[i].name == productName)
                {
                    int sales = int.Parse(productsList[i].sales);
                    sales += 1;
                    productsList[i].sales = sales.ToString();
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
        /// Array of delivered packages
        /// <param name="packages"></param>
        public void createReport(List<Packages> packages)
        {
            XmlSerializer serializer = new XmlSerializer(typeof(List<Packages>));
            TextWriter writer = new StreamWriter("ReportsData/DeliveredPackages.xml");
            serializer.Serialize(writer, packages);
            writer.Close();
        }
    }
}
