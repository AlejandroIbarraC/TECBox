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
        public string eMail { get; set; }
        public string password { get; set; }

        public Employees()
        {
        }

        public Employees(string employeeName, string employeeDepartment, string employeeEMail, string employeePassword)
        {
            name = employeeName;
            department = employeeDepartment;
            eMail = employeeEMail;
            password = employeePassword;
        }

    }
}
