import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TECBox';

  /**
   * Function in charge of searching a product based on it's name
   */
  searchProduct() {
    const productName = (document.getElementById('prod') as HTMLInputElement).value;

    (document.getElementById('prod') as HTMLInputElement).value = '';

    axios.post('https://localhost:5001/administrator/products/getProductFromName', {
      name: productName,
      description: 'null',
      barcode: 'null',
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
        window.location.replace('/products/' + response.data.barcode);
      })
      .catch(error => {
        console.log(error.response);
      });
  }
}
