import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.scss']
})
export class ModifyProductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Function in charge of modifying a product in the database
   */
  modifyProduct() {
    const prodName = (document.getElementById('mp2') as HTMLInputElement).value;
    const prodDescription = (document.getElementById('mp3') as HTMLInputElement).value;
    const prodBarcode = (document.getElementById('mp1') as HTMLInputElement).value;
    const prodSeller = (document.getElementById('mp4') as HTMLInputElement).value;
    const prodPrice = (document.getElementById('mp5') as HTMLInputElement).value;
    const prodPayTaxes = (document.getElementById('mp6') as HTMLInputElement).value;
    const prodPercentageDiscount = (document.getElementById('mp7') as HTMLInputElement).value;
    const prodEntryDate = (document.getElementById('mp8') as HTMLInputElement).value;
    const prodSales = (document.getElementById('mp9') as HTMLInputElement).value;

    (document.getElementById('mp1') as HTMLInputElement).value = '';
    (document.getElementById('mp2') as HTMLInputElement).value = '';
    (document.getElementById('mp3') as HTMLInputElement).value = '';
    (document.getElementById('mp4') as HTMLInputElement).value = '';
    (document.getElementById('mp5') as HTMLInputElement).value = '';
    (document.getElementById('mp6') as HTMLInputElement).value = '';
    (document.getElementById('mp7') as HTMLInputElement).value = '';
    (document.getElementById('mp8') as HTMLInputElement).value = '';
    (document.getElementById('mp9') as HTMLInputElement).value = '';

    axios.post('https://localhost:5001/administrator/products/modify', {
      name: prodName,
      description: prodDescription,
      barcode: prodBarcode,
      seller: prodSeller,
      price: prodPrice,
      paysTax: prodPayTaxes,
      discount: prodPercentageDiscount,
      entryDate: prodEntryDate,
      sales: prodSales
    }, {
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
  }

}
