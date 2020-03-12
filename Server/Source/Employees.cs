using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Source
{
    public class Employees
    {

        public string name { get; set; }
        public string department { get; set; }

        public Employees()
        {
        }

        public Employees(string employeeName, string employeeDepartment)
        {
            name = employeeName;
            department = employeeDepartment;
        }

    }
}
