import { Component, OnInit } from '@angular/core';
import { Product } from '../../entities/product.entity';
import { ProductService } from '../../shared/services/product.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'cartProduct.component.html',
  styleUrls: ['./cartProduct.component.scss']
})

export class CartProductComponent implements OnInit {

  cartProducts = [{}];

  constructor(
    private productService: ProductService,
    public router: Router
  ) { }

  ngOnInit() {
    this.getProductsFromServer();
  }

  async getProductsFromServer() {
    const url = 'https://localhost:5001/administrator/products'; // Usar el url como una variable para mantener el orden
    const response = await fetch(url); // Await espera la respuesta y fetch es una vara propia de JS
    if (response.ok) {
      // Parsea lo que sea que me mande como un Json sin importar que sea y lo guarda aqui
      this.cartProducts = await response.json();
    } else {
      alert('HTTP-Error: ' + response.status); // Este Else es en caso de que pegue algún error
    }
  }

  onSelect(product) {
    console.log(product);
    this.router.navigate(['/products', product.barcode]);
  }
}
