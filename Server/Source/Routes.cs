using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Source
{
    public class Routes
    {
        public string number { get; set; }
        public string districts { get; set; }

        public Routes()
        {
        }

        public Routes(string routeNumber, string productDistricts)
        {
            number = routeNumber;
            districts = productDistricts;
        }
    }
}
