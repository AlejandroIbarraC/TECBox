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
    public class BranchesController : ControllerBase
    {
        /// <summary>
        /// Function in charge of recopilating all the branches in the database
        /// </summary>
        /// <returns>
        /// A JSON with the list of branches in the database
        /// </returns>
        [EnableCors("AnotherPolicy")]
        [HttpGet]
        public List<Branches> getBranches()
        {
            List<Branches> branchesList = new List<Branches>();
            string fileName = "DataBase/branches.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            branchesList = JsonSerializer.Deserialize<List<Branches>>(jsonString);

            return branchesList;
        }

        /// <summary>
        /// Function in charge of inserting a branch in the database
        /// </summary>
        /// <param name="branch">
        /// Branch to be added
        /// </param>
        [Route("insert")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public void insertPost([FromBody] Branches branch)
        {
            List<Branches> branchesList = new List<Branches>();
            string fileName = "DataBase/branches.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            branchesList = JsonSerializer.Deserialize<List<Branches>>(jsonString);

            bool validation = true;

            for (int i = 0; i < branchesList.Count; i++)
            {
                if (branchesList[i].id == branch.id)
                {
                    validation = false;
                    break;
                }
            }

            if (validation)
            {
                branchesList.Add(branch);

                jsonString = JsonSerializer.Serialize(branchesList);
                System.IO.File.WriteAllText(fileName, jsonString);

                Debug.WriteLine("Branch inserted");
            }
            else
            {
                Debug.WriteLine("Branch has a duplicate id");
            }
        }

        /// <summary>
        /// Function in charge of modifying a branch in the database
        /// </summary>
        /// <param name="branch">
        /// Branch to be modified
        /// </param>
        [Route("modify")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public void modifyPost([FromBody] Branches branch)
        {
            List<Branches> branchesList = new List<Branches>();
            string fileName = "DataBase/branches.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            branchesList = JsonSerializer.Deserialize<List<Branches>>(jsonString);

            bool validation = false;

            for (int i = 0; i < branchesList.Count; i++)
            {
                if (branchesList[i].id == branch.id)
                {
                    branchesList[i] = branch;
                    Debug.WriteLine("Branch modified");
                    validation = true;
                    break;
                }
            }

            if (validation)
            {
                jsonString = JsonSerializer.Serialize(branchesList);
                System.IO.File.WriteAllText(fileName, jsonString);
            }
            else
            {
                Debug.WriteLine("Branch not found");
            }
        }

        /// <summary>
        /// Function in charge of deleting a branch in the database
        /// </summary>
        /// <param name="branch">
        /// Branch to be deleted
        /// </param>
        [Route("delete")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public void deletePost([FromBody] Branches branch)
        {
            List<Branches> branchesList = new List<Branches>();
            string fileName = "DataBase/branches.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            branchesList = JsonSerializer.Deserialize<List<Branches>>(jsonString);

            bool validation = false;

            for (int i = 0; i < branchesList.Count; i++)
            {
                if (branchesList[i].id == branch.id)
                {
                    branchesList.RemoveAt(i);
                    Debug.WriteLine("Branch deleted");
                    validation = true;
                    break;
                }
            }

            if (validation)
            {
                jsonString = JsonSerializer.Serialize(branchesList);
                System.IO.File.WriteAllText(fileName, jsonString);
            }
            else
            {
                Debug.WriteLine("Branch not found");
            }
        }
    }
}
