import { Injectable } from '@angular/core';

import { Product } from '../../entities/product.entity';

@Injectable()
export class ProductService {

    private cartProducts: Product[];

    constructor() {
        this.cartProducts = [
            { id: '10001', name: 'name 1', price: 100, photo: '10001.png' },
            { id: '10011', name: 'name 2', price: 200, photo: '10011.png' },
            { id: '10111', name: 'name 3', price: 300, photo: '10111.png' }
        ];
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