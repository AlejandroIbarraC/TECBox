import { Component, OnInit } from '@angular/core';
import { Product } from '../../entities/product.entity';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
	templateUrl: 'index.component.html',
	styleUrls: ['./index.component.scss']
})

export class CartProductComponent implements OnInit {
	
	carThings= [{"Option":1,"ID":"123","Name":"Box","Photo":"BoxImage","Price":"Low", "Quantity": "5", "Sub Total": "500"},{"Option":2,"ID":"234","Name":"Better Box","Photo":"BetterBoxImage","Price":"Not Very Low", "Quantity": "5", "Sub Total": "50000"},{"Option":3,"ID":"345","Name":"The Best Fucking Box","Photo":"TheBestFuckingBoxImage","Price":"You Are Being Robbe", "Quantity": "5", "Sub Total": "5000000"}]
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