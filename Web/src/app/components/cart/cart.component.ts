import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../entities/product.entity';
import { Item } from '../../entities/item.entity';
import { ProductService } from '../../shared/services/product.service';
import { isLoweredSymbol } from '@angular/compiler';
import {getLocaleDateTimeFormat} from '@angular/common';
import axios from 'axios';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {

  name = 'Log in to see information';
  address = '';
  province = '';
  city = '';
  isLoggedIn = true;

  public items: Item[] = [];
  public subtotal = 0;
  public tax = 0;
  public discount = 0;
  public total = 0;
  public deliveryDate = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    const today = new Date();
    const dd = String(today.getDate() + 3).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    this.deliveryDate = yyyy + '-' + mm + '-' + dd;

    this.activatedRoute.params.subscribe(params => {
      const prodId = params.id;
      if (prodId) {

        axios.post('https://localhost:5001/administrator/products/getProduct', {
          name: 'null',
          description: 'null',
          barcode: prodId.toString(),
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

            const item: Item = {
              id: prodId,
              quantity: 1,
              name: response.data.name,
              description: response.data.description,
              seller: response.data.seller,
              price: response.data.price,
              tax: response.data.paysTax,
              discount: response.data.discount,
              entryDate: response.data.entryDate,
              sales: response.data.sales
            };
            if (localStorage.getItem('cart') == null) {
              const cart: any = [];
              cart.push(JSON.stringify(item));
              localStorage.setItem('cart', JSON.stringify(cart));
            } else {
              const cart: any = JSON.parse(localStorage.getItem('cart'));
              let index = -1;
              for (let i = 0; i < cart.length; i++) {
                // tslint:disable-next-line:no-shadowed-variable
                const item: Item = JSON.parse(cart[i]);
                // tslint:disable-next-line:triple-equals
                if (item.id == prodId) {
                  index = i;
                  break;
                }
              }
              // tslint:disable-next-line:triple-equals
              if (index == -1) {
                cart.push(JSON.stringify(item));
                localStorage.setItem('cart', JSON.stringify(cart));
              } else {
                // tslint:disable-next-line:no-shadowed-variable
                const item: Item = JSON.parse(cart[index]);
                item.quantity += 1;
                cart[index] = JSON.stringify(item);
                localStorage.setItem('cart', JSON.stringify(cart));
              }
            }
            this.loadCart();
          })
          .catch(error => {
            console.log(error.response);
          });
      } else {
        this.loadCart();
      }
    });

    this.name = localStorage.getItem('userName');
    this.address = localStorage.getItem('userAddress');
    this.province = localStorage.getItem('userProvince');
    this.city = localStorage.getItem('userCity');

    // tslint:disable-next-line:triple-equals
    if (this.address == '') {
      this.isLoggedIn = false;
    }
  }

  /**
   * Function in charge of creating packages from the bought products and send them to the database
   */
  buyProducts() {
    if (this.isLoggedIn) {
      const cart = JSON.parse(localStorage.getItem('cart'));
      const allData = [];
      let data;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < cart.length; i++) {
        const item = JSON.parse(cart[i]);
        data = {
          trackingID: 'null',
          client: this.name,
          description: item.name,
          deliveryDate: this.deliveryDate,
          status: 'Ready for Delivery',
          route: 'null',
          deliveryMan: 'null'
        };
        allData.push(data);
      }
      axios.post('https://localhost:5001/warehouse/packages/boughtPackages',  allData, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error.response);
        });
      const newCart: any = [];
      localStorage.setItem('cart', JSON.stringify(newCart));
      window.location.replace('/cart');
    }
  }

  /**
   * Function in charge of loading the cart to be shown on screen
   */
  loadCart(): void {
    this.subtotal = 0;
    this.tax = 0;
    this.discount = 0;
    this.total = 0;
    this.items = [];
    const cart = JSON.parse(localStorage.getItem('cart'));
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < cart.length; i++) {
      const item = JSON.parse(cart[i]);
      this.items.push({
        id: item.id,
        quantity: item.quantity,
        name: item.name,
        description: item.description,
        seller: item.seller,
        price: item.price,
        tax: item.tax,
        discount: item.discount,
        entryDate: item.entryDate,
        sales: item.sales
      });
      this.subtotal += item.price * item.quantity;
      if (item.tax) {
        this.tax += 15;
      }
      this.discount += item.discount;
      this.total = this.subtotal + this.tax - this.discount;
    }
  }

  /**
   * Function in charge of removing an item from the cart
   * @param id from the item to be removed
   */
  remove(id: number): void {
    const cart: any = JSON.parse(localStorage.getItem('cart'));
    const index = -1;
    for (let i = 0; i < cart.length; i++) {
      const item: Item = JSON.parse(cart[i]);
      // tslint:disable-next-line:triple-equals
      if (item.id == id) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCart();
  }

}
