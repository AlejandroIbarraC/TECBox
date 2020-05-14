import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  products = [
    {"name": "Producto 1", "description": "Vamos a ver si esto sirve 1", "barcode": 10001, "seller": "Kevin", "price": "$100", "payTaxes": "10", "percentageDiscount": "20", "entryDate": "11/10/19", "sales": "50"},
    {"name": "Producto 2", "description": "Vamos a ver si esto sirve 2", "barcode": 10011, "seller": "Kevin", "price": "$200", "payTaxes": "10", "percentageDiscount": "20", "entryDate": "11/10/19", "sales": "50"},
    {"name": "Producto 3", "description": "Vamos a ver si esto sirve 3", "barcode": 10111, "seller": "Kevin", "price": "$90", "payTaxes": "10", "percentageDiscount": "20", "entryDate": "11/10/19", "sales": "50"}
  ]

  public productBarcode;
  public productName;
  public productPrice;
  public productDescription;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    let barcode = parseInt(this.route.snapshot.paramMap.get('id'));
    this.productBarcode = barcode;
    this.productName = this.getProductName(barcode);
    this.productPrice = this.getProductPrice(barcode);
    this.productDescription = this.getProductDescription(barcode);
  }

  getProductName(index){
    for (let product of this.products) {
      if (index == product.barcode){
        return product.name;
      }
    }
  }

  getProductPrice(index){
    for (let product of this.products) {
      if (index == product.barcode){
        return product.price;
      }
    }
  }

  getProductDescription(index){
    for (let product of this.products) {
      if (index == product.barcode){
        return product.description;
      }
    }
  }

}
