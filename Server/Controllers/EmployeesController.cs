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

        [Route("check")]
        [HttpPost]
        public Employees searchEmployee([FromBody] Employees employeeToSearch)
        {
            List<Employees> employeesList = new List<Employees>();
            string fileName = "DataBase/employees.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            employeesList = JsonSerializer.Deserialize<List<Employees>>(jsonString);
            Employees employee = null;

            for (int i = 0; i < employeesList.Count; i++)
            {
                if (employeesList[i].eMail == employeeToSearch.eMail & employeesList[i].password == employeeToSearch.password & employeesList[i].department == employeeToSearch.department)
                {
                    employee = employeesList[i];
                    break;
                }
            }
            
            if (employee != null)
            {
                return employee;
            }
            else
            {
                employee = new Employees("null", "null", "null", "null");
                return employee;
            }
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
