import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsComponent } from '../products/products.component';
import axios from 'axios';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product;

  public productBarcode;
  public productName;
  public productPrice;
  public productDescription;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // tslint:disable-next-line:radix
    const barcode = parseInt(this.route.snapshot.paramMap.get('id'));
    this.productBarcode = barcode;
    this.getProduct(barcode);
  }

  /**
   * Function in charge of sending a product barcode to the database and receives the product data
   * @param prodBarcode barcode of the product
   */
  getProduct(prodBarcode) {
    axios.post('https://localhost:5001/administrator/products/getProduct', {
      name: 'null',
      description: 'null',
      barcode: prodBarcode.toString(),
      seller: 'null',
      price: 'null',
      paysTax: 'null',
      discount: 'null',
      entryDate: 'null',
      sales: 'null'
    }, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => {
        console.log(response);
        this.productName = response.data.name;
        this.productPrice = response.data.price;
        this.productDescription = response.data.description;
      })
      .catch(error => {
        console.log(error.response);
      });
  }

}
