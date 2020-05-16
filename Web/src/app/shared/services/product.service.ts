import { Injectable } from '@angular/core';
import axios from 'axios';
import { Product } from '../../entities/product.entity';

@Injectable()
export class ProductService {

    private cartProducts: Product[];

    constructor() {
        axios.get('https://localhost:5001/administrator/products')
          .then(response => {
            // this.cartProducts = response.data;
            this.cartProducts = [
              { id: '10001', name: 'name 1', price: 100, photo: '666.png' },
              { id: '10011', name: 'name 2', price: 200, photo: '1001.png' },
              { id: '10111', name: 'name 3', price: 300, photo: '998.png' }
            ];
          })
          .catch(error => {
            console.log(error.response);
          });
        /**/
    }

    findAll(): Product[] {
        return this.cartProducts;
    }

    find(id: string): Product {
        return this.cartProducts[this.getSelectedIndex(id)];
    }

    private getSelectedIndex(id: string) {
        for (var i = 0; i < this.cartProducts.length; i++) {
            if (this.cartProducts[i].id == id) {
                return i;
            }
        }
        return -1;
    }
}
