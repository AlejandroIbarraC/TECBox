import { Injectable } from '@angular/core';

import { Product } from '../../entities/product.entity';

@Injectable()
export class ProductService {

    private cartProducts: Product[];

    constructor() {
        this.cartProducts = [
            { id: 'p01', name: 'name 1', price: 100, photo: 'thumb1.gif' },
            { id: 'p02', name: 'name 2', price: 200, photo: 'thumb2.gif' },
            { id: 'p03', name: 'name 3', price: 300, photo: 'thumb3.gif' }
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