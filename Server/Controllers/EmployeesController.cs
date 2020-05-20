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
        /// <summary>
        /// Function in charge of recopilating all the employees in the database
        /// </summary>
        /// <returns>
        /// A JSON with the list of employees in the database
        /// </returns>
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

        /// <summary>
        /// Function in charge of searching an employee by it's email, password and department
        /// </summary>
        /// <param name="employeeToSearch">
        /// Employee with the email, password and the department to be found
        /// </param>
        /// <returns>
        /// A JSON with the found employee
        /// </returns>
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
                if (employeesList[i].eMail == employeeToSearch.eMail & employeesList[i].department == employeeToSearch.department & employeesList[i].password == employeeToSearch.password)
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

        /// <summary>
        /// Function in charge of inserting an employee in the database
        /// </summary>
        /// <param name="employee">
        /// Employee to be added
        /// </param>
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

        /// <summary>
        /// Function in charge of modifying an employee in the database
        /// </summary>
        /// <param name="employee">
        /// Employee to be modified
        /// </param>
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

        /// <summary>
        /// Function in charge of deleting an employee in the database
        /// </summary>
        /// <param name="employee">
        /// Branch to be deleted
        /// </param>
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
