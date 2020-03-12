using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source;

namespace Server.Controllers
{
    [Route("administrator/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
   
        [HttpGet]
        public List<Employees> getEmployees()
        {
            List<Employees> employeesList = new List<Employees>();
            string fileName = "DataBase/employees.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            employeesList = JsonSerializer.Deserialize<List<Employees>>(jsonString);

            return employeesList;
        }

        [Route("insert")]
        [HttpPost]
        public void insertPost([FromBody] Employees employees)
        {
            Debug.WriteLine("Rol insertado");
        }

        [Route("modify")]
        [HttpPost]
        public void modifyPost([FromBody] Employees employees)
        {
            Debug.WriteLine("Rol modificado");
        }

        [Route("delete")]
        [HttpPost]
        public void deletePost([FromBody] Employees employees)
        {
            Debug.WriteLine("Rol eliminado");
        }
    }
}
