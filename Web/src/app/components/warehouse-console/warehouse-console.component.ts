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

  logOut() {
    localStorage.setItem('userType', 'none');
    this.router.navigate(['/login']);
  }

  async getPackagesFromServer() {
    const url = 'https://localhost:5001/warehouse/packages'; // Usar el url como una variable para mantener el orden
    const response = await fetch(url); // Await espera la respuesta y fetch es una vara propia de JS
    if (response.ok) {
      // Parsea lo que sea que me mande como un Json sin importar que sea y lo guarda aqui
      this.packages = await response.json();
    } else {
      alert('HTTP-Error: ' + response.status); // Este Else es en caso de que pegue algún error
    }
  }

  addData() {
    // Get the data from the entries using the id
    const pkgTrackId = (document.getElementById('w1') as HTMLInputElement).value;
    const pkgClient = (document.getElementById('w2') as HTMLInputElement).value;
    const pkgDescription = (document.getElementById('w3') as HTMLInputElement).value;
    const pgkDeliveryDate = (document.getElementById('w4') as HTMLInputElement).value;
    const pkgStatus = (document.getElementById('w5') as HTMLInputElement).value;
    const pkgRoute = (document.getElementById('w6') as HTMLInputElement).value;
    const pkgDeliveryMan = (document.getElementById('w7') as HTMLInputElement).value;

    // This part empties the entries
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
      })
      .catch(error => {
        console.log(error.response);
      });
    window.location.reload();
  }


  deleteData(){
     // Get the data from the entries using the id
     const pkgTrackId = (document.getElementById('w1') as HTMLInputElement).value;
     const pkgClient = (document.getElementById('w2') as HTMLInputElement).value;
     const pkgDescription = (document.getElementById('w3') as HTMLInputElement).value;
     const pgkDeliveryDate = (document.getElementById('w4') as HTMLInputElement).value;
     const pkgStatus = (document.getElementById('w5') as HTMLInputElement).value;
     const pkgRoute = (document.getElementById('w6') as HTMLInputElement).value;
     const pkgDeliveryMan = (document.getElementById('w7') as HTMLInputElement).value;

     // This part empties the entries
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
      })
      .catch(error => {
        console.log(error.response);
      });
  }

}
