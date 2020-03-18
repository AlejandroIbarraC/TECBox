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

        [Route("tracking")]
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
                package = new Packages(-1, "null", "null", "null", "null", -1, "null");
                return package;
            }
        }

        [Route("delivered")]
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
