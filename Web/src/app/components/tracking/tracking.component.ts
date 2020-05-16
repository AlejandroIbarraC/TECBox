import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {
  showStatus = false;
  pStatus = '';
  errorLabel = '';

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Function in charge of sending a package tracking number to the database and receive the current info of it
   */
  track() {
    const trackNumber = (document.getElementById('tnumber') as HTMLInputElement).value;
    (document.getElementById('tnumber') as HTMLInputElement).value = '';

    // tslint:disable-next-line:triple-equals
    if (trackNumber != '') {
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
            this.pStatus = 'Package not found';
          } else {
            this.pStatus = response.data.status;
          }
          this.showStatus = true;
        })
        .catch(error => {
          console.log(error.response);
          this.pStatus = 'Error. Offline';
          this.showStatus = true;
        });
      this.errorLabel = '';
    } else {
      this.showStatus = false;
      this.errorLabel = 'Please enter valid package tracking number';
    }
  }

}
