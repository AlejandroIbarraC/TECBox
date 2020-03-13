using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Source
{
    public class Sellers
    {
        public string name { get; set; }
        public int id { get; set; }

        public Sellers()
        {
        }

        public Sellers(string sellerName, int sellerID)
        {
            name = sellerName;
            id = sellerID;
        }
    }
}
