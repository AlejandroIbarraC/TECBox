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

  /**
   * Function in charge of retrieving the products list from the database
   */
  async getProductsFromServer() {
    const url = 'https://localhost:5001/administrator/products';
    const response = await fetch(url);
    if (response.ok) {
      this.cartProducts = await response.json();
    } else {
      alert('HTTP-Error: ' + response.status);
    }
  }

  /**
   * Function in charge of redirecting the user to a product
   * @param product barcode of the product
   */
  onSelect(product) {
    this.router.navigate(['/products', product.barcode]);
  }
}
