import { Component, OnInit } from '@angular/core';
import { Product } from '../../entities/product.entity';
import { ProductService } from '../../services/product.service';

@Component({
	templateUrl: 'index.component.html'
})

export class CartProductComponent implements OnInit {

	private cartProducts: Product[];

	constructor(
		private productService: ProductService
	) { }

	ngOnInit() {
		this.cartProducts = this.productService.findAll();
	}


}