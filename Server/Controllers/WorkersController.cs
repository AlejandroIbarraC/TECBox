using Server.Source;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Text.Json;
using Microsoft.AspNetCore.Cors;

namespace Server.Controllers
{
    [Route("administrator/[controller]")]
    [ApiController]
    public class WorkersController : ControllerBase
    {
        [EnableCors("AnotherPolicy")]
        [HttpGet]
        public List<Workers> getWorkers()
        {
            List<Workers> workersList = new List<Workers>();
            string fileName = "DataBase/workers.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            workersList = JsonSerializer.Deserialize<List<Workers>>(jsonString);

            return workersList;
        }

        [Route("insert")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public void insertPost([FromBody] Workers worker)
        {
            List<Workers> workersList = new List<Workers>();
            string fileName = "DataBase/workers.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            workersList = JsonSerializer.Deserialize<List<Workers>>(jsonString);

            List<Branches> branchesList = new List<Branches>();
            fileName = "DataBase/branches.json";

            jsonString = System.IO.File.ReadAllText(fileName);
            branchesList = JsonSerializer.Deserialize<List<Branches>>(jsonString);

            if (branchesList.Count > 0)
            {
                bool validation = true;
                for (int i = 0; i < workersList.Count; i++)
                {
                    if (workersList[i].idNumber == worker.idNumber)
                    {
                        validation = false;
                        break;
                    }
                }
                bool validation2 = true;
                for (int i = 0; i < branchesList.Count; i++)
                {
                    if (branchesList[i].name == worker.branch)
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
                    workersList.Add(worker);

                    fileName = "DataBase/workers.json";

                    jsonString = JsonSerializer.Serialize(workersList);
                    System.IO.File.WriteAllText(fileName, jsonString);

                    Debug.WriteLine("Worker inserted");
                }
                else
                {
                    Debug.WriteLine("Worker has a duplicate id or the branch doesn't exist");
                }
            }
            else
            {
                Debug.WriteLine("There aren't any branches available at the moment");
            }
        }

        [Route("modify")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public void modifyPost([FromBody] Workers worker)
        {
            List<Workers> workersList = new List<Workers>();
            string fileName = "DataBase/workers.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            workersList = JsonSerializer.Deserialize<List<Workers>>(jsonString);

            bool validation = false;

            for (int i = 0; i < workersList.Count; i++)
            {
                if (workersList[i].idNumber == worker.idNumber)
                {
                    workersList[i] = worker;
                    Debug.WriteLine("Worker modified");
                    validation = true;
                    break;
                }
            }

            if (validation)
            {
                jsonString = JsonSerializer.Serialize(workersList);
                System.IO.File.WriteAllText(fileName, jsonString);
            }
            else
            {
                Debug.WriteLine("Wroker not found");
            }
        }

        [Route("delete")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public void deletePost([FromBody] Workers worker)
        {
            List<Workers> workersList = new List<Workers>();
            string fileName = "DataBase/workers.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            workersList = JsonSerializer.Deserialize<List<Workers>>(jsonString);

            bool validation = false;

            for (int i = 0; i < workersList.Count; i++)
            {
                if (workersList[i].idNumber == worker.idNumber)
                {
                    workersList.RemoveAt(i);
                    Debug.WriteLine("Worker deleted");
                    validation = true;
                    break;
                }
            }

            if (validation)
            {
                jsonString = JsonSerializer.Serialize(workersList);
                System.IO.File.WriteAllText(fileName, jsonString);
            }
            else
            {
                Debug.WriteLine("Worker not found");
            }
        }
    }
}
