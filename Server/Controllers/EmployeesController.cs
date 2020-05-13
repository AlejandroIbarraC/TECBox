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
using Microsoft.AspNetCore.Cors;

namespace Server.Controllers
{
    [Route("administrator/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {

        [EnableCors("AnotherPolicy")]
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
        [EnableCors("AnotherPolicy")]
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
                if (employeesList[i].eMail == employeeToSearch.eMail & employeesList[i].department == employeeToSearch.department)
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
                employee = new Employees("null", "null", "null", "null", "null");
                return employee;
            }
        }

        [Route("insert")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public void insertPost([FromBody] Employees employee)
        {
            List<Employees> employeesList = new List<Employees>();
            string fileName = "DataBase/employees.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            employeesList = JsonSerializer.Deserialize<List<Employees>>(jsonString);

            bool validation = true;

            for (int i = 0; i < employeesList.Count; i++)
            {
                if (employeesList[i].id == employee.id)
                {
                    validation = false;
                    break;
                }
            }

            if (validation)
            {
                employeesList.Add(employee);

                jsonString = JsonSerializer.Serialize(employeesList);
                System.IO.File.WriteAllText(fileName, jsonString);

                Debug.WriteLine("Employee inserted");
            }
            else
            {
                Debug.WriteLine("Employee has a duplicate id");
            }
        }

        [Route("modify")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public void modifyPost([FromBody] Employees employee)
        {
            List<Employees> employeesList = new List<Employees>();
            string fileName = "DataBase/employees.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            employeesList = JsonSerializer.Deserialize<List<Employees>>(jsonString);

            bool validation = false;

            for (int i = 0; i < employeesList.Count; i++)
            {
                if (employeesList[i].id == employee.id)
                {
                    employeesList[i] = employee;
                    Debug.WriteLine("Employee modified");
                    validation = true;
                    break;
                }
            }

            if (validation)
            {
                jsonString = JsonSerializer.Serialize(employeesList);
                System.IO.File.WriteAllText(fileName, jsonString);
            }
            else
            {
                Debug.WriteLine("Employee not found");
            }
        }

        [Route("delete")]
        [EnableCors("AnotherPolicy")]
        [HttpPost]
        public void deletePost([FromBody] Employees employee)
        {
            List<Employees> employeesList = new List<Employees>();
            string fileName = "DataBase/employees.json";

            string jsonString = System.IO.File.ReadAllText(fileName);
            employeesList = JsonSerializer.Deserialize<List<Employees>>(jsonString);

            bool validation = false;

            for (int i = 0; i < employeesList.Count; i++)
            {
                if (employeesList[i].id == employee.id)
                {
                    employeesList.RemoveAt(i);
                    Debug.WriteLine("Employee deleted");
                    validation = true;
                    break;
                }
            }

            if (validation)
            {
                jsonString = JsonSerializer.Serialize(employeesList);
                System.IO.File.WriteAllText(fileName, jsonString);
            }
            else
            {
                Debug.WriteLine("Employee not found");
            }
        }
    }
}
