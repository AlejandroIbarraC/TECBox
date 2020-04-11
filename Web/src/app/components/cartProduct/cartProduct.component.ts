import { Component, OnInit } from '@angular/core';
import { Product } from '../../entities/product.entity';
import { ProductService } from '../../shared/services/product.service';
import { Router } from '@angular/router';

@Component({
	templateUrl: 'cartProduct.component.html',
	styleUrls: ['./cartProduct.component.scss']
})

export class CartProductComponent implements OnInit {

	public cartProducts: Product[];

	constructor(
		private productService: ProductService,
		public router: Router
	) { }

	ngOnInit() {
		this.cartProducts = this.productService.findAll();
	}

	onSelect(product){
		this.router.navigate(['/products', product.id]);
	  }

}