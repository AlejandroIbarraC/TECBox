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
    {"id": 1, "name": "Papel higénico", "price": "$100"},
    {"id": 2, "name": "Animalcrossing", "price": "$500"},
    {"id": 3, "name": "Gorro de lana", "price": "$90"}
  ]

  public productId;
  public productName;
  public productPrice;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.productId = id;
    this.productName = this.getProductName(id);
    this.productPrice = this.getProductPrice(id);
  }

  getProductName(index){
    for (let product of this.products) {
      if (index == product.id){
        return product.name;
      }
    }
  }

  getProductPrice(index){
    for (let product of this.products) {
      if (index == product.id){
        return product.price;
      }
    }
  }

}
