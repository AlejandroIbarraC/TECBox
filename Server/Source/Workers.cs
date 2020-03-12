using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Source
{
    public class Workers
    {
        public int idNumber { get; set; }
        public string fullName { get; set; }
        public string birthday { get; set; }
        public string entryDate { get; set; }
        public string branch { get; set; }
        public int hourlyWage { get; set; }
        public int monthlyWage { get; set; }

        public Workers()
        {
        }

        public Workers(int workerID, string workerName, string workerBirthday, string workerEntryDate, string workerBranch, int workerHourlyWage, int workerMonthlyWage)
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
