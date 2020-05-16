import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products = [
    {id: 1, name: 'Papel higénico', price: '$100'},
    {id: 2, name: 'Animalcrossing', price: '$500'},
    {id: 3, name: 'Gorro de lana', price: '$90'}
  ];

  constructor(public router: Router) { }

  ngOnInit() {
  }

  onSelect(product) {
    this.router.navigate(['/products', product.id]);
  }

}
