import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  

  products = [
    {"id": 1, "name": "Papel higénico"},
    {"id": 2, "name": "Animalcrossing"},
    {"id": 3, "name": "Gorro de lana"}
  ]

  public productId;
  public productName;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.productId = id;
    this.productName = this.getProductName(id);
  }

  getProductName(index){
    for (let product of this.products) {
      if (index == product.id){
        return product.name;
      }
    }
  }

}
