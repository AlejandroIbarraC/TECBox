import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products = [
    {"id": 1, "name": "Papel"},
    {"id": 2, "name": "Animal"},
    {"id": 3, "name": "Gorro"}
  ]

  constructor(public router: Router) { }

  ngOnInit(){
  }

  onSelect(product){
    this.router.navigate(['/products', product.id]);

  }

}
