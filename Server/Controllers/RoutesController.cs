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
    [Route("administrator/[controller]")]
    [ApiController]
    public class RoutesController : ControllerBase
    {
        /// <summary>
        /// Function in charge of recopilating all the routes in the database
        /// </summary>
        /// <returns>
        /// A JSON with the list of routes in the database
        /// </returns>
        [EnableCors("AnotherPolicy")]
        [HttpGet]
        public List<Routes> getRoutes()
        {
            List<Routes> routesList = new List<Routes>();
            string fileName = "DataBase/routes.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            routesList = JsonSerializer.Deserialize<List<Routes>>(jsonString);

            return routesList;
        }

        /// <summary>
        /// Function in charge of finding all the packages in a specific route
        /// </summary>
        /// <param name="packagesRoute">
        /// A route that contains the route that will be used to track the packages
        /// </param>
        /// <returns>
        /// A JSON with the list of packages associated with the route
        /// </returns>
        [Route("search")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public List<Packages> getPackagesFromRoute([FromBody] Routes packagesRoute)
        {
            List<Routes> routesList = new List<Routes>();
            List<Packages> finalList = new List<Packages>();
            string fileName = "DataBase/routes.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            routesList = JsonSerializer.Deserialize<List<Routes>>(jsonString);

            bool validation = false;

            for (int i = 0; i < routesList.Count; i++)
            {
                if (routesList[i].number == packagesRoute.number)
                {
                    validation = true;
                    
                }
            }
            if (validation)
            {
                List<Packages> packagesList = new List<Packages>();
                List<Packages> middleList = new List<Packages>();
                fileName = "DataBase/packages.json";

                jsonString = System.IO.File.ReadAllText(fileName);
                packagesList = JsonSerializer.Deserialize<List<Packages>>(jsonString);
                validation = false;

                for (int i = 0; i < packagesList.Count; i++)
                {
                    if (packagesList[i].route == packagesRoute.number)
                    {
                        middleList.Add(packagesList[i]);
                        validation = true;
                    }
                }

                if (validation)
                {
                    validation = false;
                    for (int i = 0; i < middleList.Count; i++)
                    {
                        if (middleList[i].status == "Ready for Delivery")
                        {
                            finalList.Add(middleList[i]);
                            validation = true;
                        }
                    }
                    if (validation)
                    {
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
        /// Function in charge of inserting a route in the database
        /// </summary>
        /// <param name="route">
        /// Route to be added
        /// </param>
        [Route("insert")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public void insertPost([FromBody] Routes route)
        {
            List<Routes> routesList = new List<Routes>();
            string fileName = "DataBase/routes.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            routesList = JsonSerializer.Deserialize<List<Routes>>(jsonString);

            bool validation = true;

            for (int i = 0; i < routesList.Count; i++)
            {
                if (routesList[i].number == route.number)
                {
                    validation = false;
                    break;
                }
            }

            if (validation)
            {
                routesList.Add(route);

                jsonString = JsonSerializer.Serialize(routesList);
                System.IO.File.WriteAllText(fileName, jsonString);

                Debug.WriteLine("Route inserted");
            }
            else
            {
                Debug.WriteLine("Route has a duplicate number");
            }
        }

        /// <summary>
        /// Function in charge of modifying a route in the database
        /// </summary>
        /// <param name="route">
        /// Route to be modified
        /// </param>
        [Route("modify")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public void modifyPost([FromBody] Routes route)
        {
            List<Routes> routesList = new List<Routes>();
            string fileName = "DataBase/routes.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            routesList = JsonSerializer.Deserialize<List<Routes>>(jsonString);

            bool validation = false;

            for (int i = 0; i < routesList.Count; i++)
            {
                if (routesList[i].number == route.number)
                {
                    routesList[i] = route;
                    Debug.WriteLine("Route modified");
                    validation = true;
                    break;
                }
            }

            if (validation)
            {
                jsonString = JsonSerializer.Serialize(routesList);
                System.IO.File.WriteAllText(fileName, jsonString);
            }
            else
            {
                Debug.WriteLine("Route not found");
            }
        }

        /// <summary>
        /// Function in charge of deleting a route in the database
        /// </summary>
        /// <param name="route">
        /// Route to be deleted
        /// </param>
        [Route("delete")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public void deletePost([FromBody] Routes route)
        {
            List<Routes> routesList = new List<Routes>();
            string fileName = "DataBase/routes.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            routesList = JsonSerializer.Deserialize<List<Routes>>(jsonString);

            bool validation = false;

            for (int i = 0; i < routesList.Count; i++)
            {
                if (routesList[i].number == route.number)
                {
                    routesList.RemoveAt(i);
                    Debug.WriteLine("Route deleted");
                    validation = true;
                    break;
                }
            }

            if (validation)
            {
                jsonString = JsonSerializer.Serialize(routesList);
                System.IO.File.WriteAllText(fileName, jsonString);
            }
            else
            {
                Debug.WriteLine("Route not found");
            }
        }

        /// <summary>
        /// Function in charge of creating a xml from an array
        /// </summary>
        /// <param name="packages">
        /// Array of packages ready for delivery
        /// </param>
        public void createReport(List<Packages> packages)
        {
            XmlSerializer serializer = new XmlSerializer(typeof(List<Packages>));
            TextWriter writer = new StreamWriter("ReportsData/PackagesInRouteForDelivery.xml");
            serializer.Serialize(writer, packages);
            writer.Close();           
        }
    }
}
