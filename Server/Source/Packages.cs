using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Source
{
    public class Packages
    {
        public string trackingID { get; set; }
        public string client { get; set; }
        public string description { get; set; }
        public string deliveryDate { get; set; }
        public string status { get; set; }
        public string route { get; set; }
        public string deliveryMan { get; set; }

        public Packages()
        {
        }

        public Packages(string packageTrackingID, string packageClient, string packageDescription, string packageDeliveryDate, string packagesStatus, string packageRoute, string packageDeliveryMan)
        {
            trackingID = packageTrackingID;
            client = packageClient;
            description = packageDescription;
            deliveryDate = packageDeliveryDate;
            status = packagesStatus;
            route = packageRoute;
            deliveryMan = packageDeliveryMan;
        }
    }
}
