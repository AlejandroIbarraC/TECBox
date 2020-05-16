import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-modify-seller',
  templateUrl: './modify-seller.component.html',
  styleUrls: ['./modify-seller.component.scss']
})
export class ModifySellerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Function in charge of modifying a seller in the database
   */
  modifySeller() {
    const selName = (document.getElementById('ms2') as HTMLInputElement).value;
    const selIdNumber = (document.getElementById('ms1') as HTMLInputElement).value;

    (document.getElementById('ms1') as HTMLInputElement).value = '';
    (document.getElementById('ms2') as HTMLInputElement).value = '';

    axios.post('https://localhost:5001/administrator/sellers/modify', {
      name: selName,
      id: selIdNumber
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
