using Server.Source;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Text.Json;

namespace Server.Controllers
{
    [Route("administrator/[controller]")]
    [ApiController]
    public class WorkersController : ControllerBase
    {
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
        [HttpPost]
        public void insertPost([FromBody] Workers workers)
        {
            Debug.WriteLine("Trabajador insertado");
        }

        [Route("modify")]
        [HttpPost]
        public void modifyPost([FromBody] Workers workers)
        {
            Debug.WriteLine("Trabajador modificado");
        }

        [Route("delete")]
        [HttpPost]
        public void deletePost([FromBody] Workers workers)
        {
            Debug.WriteLine("Trabajador eliminado");
        }
    }
}
