using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Source
{
    public class Branches
    {
        public string name { get; set; }
        public string address { get; set; }
        public string province { get; set; }
        public int phone { get; set; }
        public string boss { get; set; }
        public string city { get; set; }
        public int id { get; set; }

        public Branches()
        {
        }

        public Branches(string branchName, string branchAddress, string branchProvince, int branchPhone, string branchBoss, string branchCity, int branchID)
        {
            name = branchName;
            address = branchAddress;
            province = branchProvince;
            phone = branchPhone;
            boss = branchBoss;
            city = branchCity;
            id = branchID;
        }

    }
}
