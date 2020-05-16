import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-warehouse-console',
  templateUrl: './warehouse-console.component.html',
  styleUrls: ['./warehouse-console.component.scss']
})
export class WarehouseConsoleComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  packages = [{}];

  ngOnInit(): void {
    this.getPackagesFromServer();
  }

  /**
   * Function in charge of logging out of the session
   */
  logOut() {
    localStorage.setItem('userType', 'none');
    this.router.navigate(['/login']);
  }

  /**
   * Function in charge of retrieving the packages list from the database
   */
  async getPackagesFromServer() {
    const url = 'https://localhost:5001/warehouse/packages';
    const response = await fetch(url);
    if (response.ok) {
      this.packages = await response.json();
    } else {
      alert('HTTP-Error: ' + response.status);
    }
  }

  /**
   * Function in charge of inserting a package to the database
   */
  addData() {
    const pkgTrackId = (document.getElementById('w1') as HTMLInputElement).value;
    const pkgClient = (document.getElementById('w2') as HTMLInputElement).value;
    const pkgDescription = (document.getElementById('w3') as HTMLInputElement).value;
    const pgkDeliveryDate = (document.getElementById('w4') as HTMLInputElement).value;
    const pkgStatus = (document.getElementById('w5') as HTMLInputElement).value;
    const pkgRoute = (document.getElementById('w6') as HTMLInputElement).value;
    const pkgDeliveryMan = (document.getElementById('w7') as HTMLInputElement).value;

    (document.getElementById('w1') as HTMLInputElement).value = '';
    (document.getElementById('w2') as HTMLInputElement).value = '';
    (document.getElementById('w3') as HTMLInputElement).value = '';
    (document.getElementById('w4') as HTMLInputElement).value = '';
    (document.getElementById('w5') as HTMLInputElement).value = '';
    (document.getElementById('w6') as HTMLInputElement).value = '';
    (document.getElementById('w7') as HTMLInputElement).value = '';

    axios.post('https://localhost:5001/warehouse/packages/insert', {
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
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  /**
   * Function in charge of deleting a package from the database
   */
  deleteData() {
     const pkgTrackId = (document.getElementById('w1') as HTMLInputElement).value;
     const pkgClient = (document.getElementById('w2') as HTMLInputElement).value;
     const pkgDescription = (document.getElementById('w3') as HTMLInputElement).value;
     const pgkDeliveryDate = (document.getElementById('w4') as HTMLInputElement).value;
     const pkgStatus = (document.getElementById('w5') as HTMLInputElement).value;
     const pkgRoute = (document.getElementById('w6') as HTMLInputElement).value;
     const pkgDeliveryMan = (document.getElementById('w7') as HTMLInputElement).value;

     (document.getElementById('w1') as HTMLInputElement).value = '';
     (document.getElementById('w2') as HTMLInputElement).value = '';
     (document.getElementById('w2') as HTMLInputElement).value = '';
     (document.getElementById('w4') as HTMLInputElement).value = '';
     (document.getElementById('w5') as HTMLInputElement).value = '';
     (document.getElementById('w6') as HTMLInputElement).value = '';
     (document.getElementById('w7') as HTMLInputElement).value = '';

     axios.post('https://localhost:5001/warehouse/packages/delete', {
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
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
      });
  }

}
