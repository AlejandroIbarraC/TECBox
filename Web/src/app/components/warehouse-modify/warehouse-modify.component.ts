import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-warehouse-modify',
  templateUrl: './warehouse-modify.component.html',
  styleUrls: ['./warehouse-modify.component.scss']
})
export class WarehouseModifyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Function in charge of modifying a package in the database
   */
  modifyWareHouse() {
     const pkgTrackId = (document.getElementById('mw1') as HTMLInputElement).value;
     const pkgClient = (document.getElementById('mw2') as HTMLInputElement).value;
     const pkgDescription = (document.getElementById('mw3') as HTMLInputElement).value;
     const pgkDeliveryDate = (document.getElementById('mw4') as HTMLInputElement).value;
     const pkgStatus = (document.getElementById('mw5') as HTMLInputElement).value;
     const pkgRoute = (document.getElementById('mw6') as HTMLInputElement).value;
     const pkgDeliveryMan = (document.getElementById('mw7') as HTMLInputElement).value;

     (document.getElementById('mw1') as HTMLInputElement).value = '';
     (document.getElementById('mw2') as HTMLInputElement).value = '';
     (document.getElementById('mw3') as HTMLInputElement).value = '';
     (document.getElementById('mw4') as HTMLInputElement).value = '';
     (document.getElementById('mw5') as HTMLInputElement).value = '';
     (document.getElementById('mw6') as HTMLInputElement).value = '';
     (document.getElementById('mw7') as HTMLInputElement).value = '';

     axios.post('https://localhost:5001/warehouse/packages/modify', {
      trackingID: pkgTrackId,
      client: pkgClient,
      description: pkgDescription,
      deliveryDate: pgkDeliveryDate,
      status: pkgStatus,
      route: pkgRoute,
      deliveryMan: pkgDeliveryMan
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
