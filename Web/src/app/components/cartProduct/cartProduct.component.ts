import { Component, OnInit } from '@angular/core';
import { Product } from '../../entities/product.entity';
import { ProductService } from '../../services/product.service';

@Component({
	templateUrl: 'index.component.html',
	styleUrls: ['./index.component.scss']
})

export class CartProductComponent implements OnInit {

	public cartProducts: Product[];

	constructor(
		private productService: ProductService
	) { }

	ngOnInit() {
		this.cartProducts = this.productService.findAll();
	}


}