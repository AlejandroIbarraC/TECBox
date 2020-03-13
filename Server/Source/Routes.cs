using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Source
{
    public class Routes
    {
        public int number { get; set; }
        public string districts { get; set; }

        public Routes()
        {
        }

        public Routes(int routeNumber, string productDistricts)
        {
            number = routeNumber;
            districts = productDistricts;
        }
    }
}
