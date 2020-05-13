import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  track() {

    const trackNumber = (document.getElementById('tnumber') as HTMLInputElement).value;

    (document.getElementById('tnumber') as HTMLInputElement).value = '';

    axios.post('https://localhost:5001/warehouse/packages/tracking', {
      trackingID: trackNumber,
      client: 'null',
      description: 'null',
      deliveryDate: 'null',
      status: 'null',
      route: 'null',
      deliveryMan: 'null'
    }, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => {
        console.log(response);
        // tslint:disable-next-line:triple-equals
        if (response.data.status == 'null') {
          document.getElementById('pstatus').textContent = 'Package not found';
        } else {
          document.getElementById('pstatus').textContent = response.data.status;
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  }

}
