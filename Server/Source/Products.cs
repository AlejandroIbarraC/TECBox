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
        public int barcode { get; set; }
        public string seller { get; set; }
        public int price { get; set; }
        public bool paysTax { get; set; }
        public int discount { get; set; }

        public Products()
        {
        }

        public Products(string productName, string productDescription, int productBarcode, string productSeller, int productPrice, bool productTax, int productDiscount)
        {
            name = productName;
            description = productDescription;
            barcode = productBarcode;
            seller = productSeller;
            price = productPrice;
            paysTax = productTax;
            discount = productDiscount;
        }
    }
}
