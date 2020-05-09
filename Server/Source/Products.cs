using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Source
{
    public class Products
    {
        public string name { get; set; }
        public string description { get; set; }
        public string barcode { get; set; }
        public string seller { get; set; }
        public string price { get; set; }
        public string paysTax { get; set; }
        public string discount { get; set; }
        public string entryDate { get; set; }
        public string sales { get; set; }

        public Products()
        {
        }

        public Products(string productName, string productDescription, string productBarcode, string productSeller, string productPrice, string productTax, string productDiscount, string productEntryDate, string productSales)
        {
            name = productName;
            description = productDescription;
            barcode = productBarcode;
            seller = productSeller;
            price = productPrice;
            paysTax = productTax;
            discount = productDiscount;
            entryDate = productEntryDate;
            sales = productSales;
        }
    }
}
