using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Source
{
    public class Workers
    {
        public string idNumber { get; set; }
        public string fullName { get; set; }
        public string birthday { get; set; }
        public string entryDate { get; set; }
        public string branch { get; set; }
        public string hourlyWage { get; set; }
        public string monthlyWage { get; set; }

        public Workers()
        {
        }

        public Workers(string workerID, string workerName, string workerBirthday, string workerEntryDate, string workerBranch, string workerHourlyWage, string workerMonthlyWage)
        {
            idNumber = workerID;
            fullName = workerName;
            birthday = workerBirthday;
            entryDate = workerEntryDate;
            branch = workerBranch;
            hourlyWage = workerHourlyWage;
            monthlyWage = workerMonthlyWage;
        }
    }
}
