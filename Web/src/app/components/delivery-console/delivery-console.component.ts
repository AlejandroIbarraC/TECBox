import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-delivery-console',
  templateUrl: './delivery-console.component.html',
  styleUrls: ['./delivery-console.component.scss']
})
export class DeliveryConsoleComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  data = [{}];

  ngOnInit(): void {
  }

  logOut() {
    localStorage.setItem('userType', 'none');
    this.router.navigate(['/login']);
  }

  bestSellers() {
    const fromDate = (document.getElementById('from-report1') as HTMLInputElement).value;
    const toDate = (document.getElementById('to-report1') as HTMLInputElement).value;

    (document.getElementById('from-report1') as HTMLInputElement).value = '';
    (document.getElementById('to-report1') as HTMLInputElement).value = '';

    axios.post('https://localhost:5001/administrator/products/popularity', {
      name: toDate,
      description: 'null',
      barcode: 'null',
      seller: 'null',
      price: 'null',
      paysTax: 'null',
      discount: 'null',
      entryDate: fromDate,
      sales: 'null'
    }, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => {
        console.log(response);
        this.data = response.data;
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  deliveryListByRoute() {
    const routeNumber = (document.getElementById('route-number') as HTMLInputElement).value;

    (document.getElementById('route-number') as HTMLInputElement).value = '';

    axios.post('https://localhost:5001/administrator/routes/search', {
      number: routeNumber,
      districts: 'null'
    }, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => {
        console.log(response);
        this.data = response.data;
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  deliveredPackages() {
    const fromDate = (document.getElementById('from-report3') as HTMLInputElement).value;
    const toDate = (document.getElementById('to-report3') as HTMLInputElement).value;

    (document.getElementById('from-report3') as HTMLInputElement).value = '';
    (document.getElementById('to-report3') as HTMLInputElement).value = '';

    axios.post('https://localhost:5001/warehouse/packages/delivered', {
      trackingID: 'null',
      client: fromDate,
      description: 'null',
      deliveryDate: toDate,
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
        this.data = response.data;
      })
      .catch(error => {
        console.log(error.response);
      });
  }

}
