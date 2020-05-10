import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/shared/services/auth.service';
import axios from 'axios'; // Este import es importante, es con lo que se hacen los gets
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private httpClient: HttpClient,
    private router: Router
    ) { }

  // Archivos usados para proyectar en las tablas
  employees = [{}];
  branches = [{}];
  workers = [{}];
  sellers = [{}];
  products = [{}];
  routes = [{}];
  users = [{}];

  ngOnInit(): void {
    this.getEmployeesFromServer();
    this.getBranchesFromServer();
    this.getWorkersFromServer();
    this.getSellersFromServer();
    this.getProductsFromServer();
    this.getRoutesFromServer();
    this.getUsersFromServer();
  }

  logOut() {
    localStorage.setItem('userType', 'none');
    this.router.navigate(['/login']);
  }

  // Esto es para hacer gets y guarda lo que obtenga en la var json, de una vez parseado
  async getEmployeesFromServer() {
    const url = 'https://localhost:5001/administrator/employees'; // Usar el url como una variable para mantener el orden
    const response = await fetch(url); // Await espera la respuesta y fetch es una vara propia de JS
    if (response.ok) {
       // Parsea lo que sea que me mande como un Json sin importar que sea y lo guarda aqui
      this.employees = await response.json();
    } else {
      alert('HTTP-Error: ' + response.status); // Este Else es en caso de que pegue algún error
    }
  }

  async getBranchesFromServer() {
    const url = 'https://localhost:5001/administrator/branches'; // Usar el url como una variable para mantener el orden
    const response = await fetch(url); // Await espera la respuesta y fetch es una vara propia de JS
    if (response.ok) {
       // Parsea lo que sea que me mande como un Json sin importar que sea y lo guarda aqui
      this.branches = await response.json();
    } else {
      alert('HTTP-Error: ' + response.status); // Este Else es en caso de que pegue algún error
    }
  }

  async getWorkersFromServer() {
    const url = 'https://localhost:5001/administrator/workers'; // Usar el url como una variable para mantener el orden
    const response = await fetch(url); // Await espera la respuesta y fetch es una vara propia de JS
    if (response.ok) {
       // Parsea lo que sea que me mande como un Json sin importar que sea y lo guarda aqui
      this.workers = await response.json();
    } else {
      alert('HTTP-Error: ' + response.status); // Este Else es en caso de que pegue algún error
    }
  }

  async getSellersFromServer() {
    const url = 'https://localhost:5001/administrator/sellers'; // Usar el url como una variable para mantener el orden
    const response = await fetch(url); // Await espera la respuesta y fetch es una vara propia de JS
    if (response.ok) {
      // Parsea lo que sea que me mande como un Json sin importar que sea y lo guarda aqui
      this.sellers = await response.json();
    } else {
      alert('HTTP-Error: ' + response.status); // Este Else es en caso de que pegue algún error
    }
  }

  async getProductsFromServer() {
    const url = 'https://localhost:5001/administrator/products'; // Usar el url como una variable para mantener el orden
    const response = await fetch(url); // Await espera la respuesta y fetch es una vara propia de JS
    if (response.ok) {
      // Parsea lo que sea que me mande como un Json sin importar que sea y lo guarda aqui
      this.products = await response.json();
    } else {
      alert('HTTP-Error: ' + response.status); // Este Else es en caso de que pegue algún error
    }
  }

  async getRoutesFromServer() {
    const url = 'https://localhost:5001/administrator/routes'; // Usar el url como una variable para mantener el orden
    const response = await fetch(url); // Await espera la respuesta y fetch es una vara propia de JS
    if (response.ok) {
      // Parsea lo que sea que me mande como un Json sin importar que sea y lo guarda aqui
      this.routes = await response.json();
    } else {
      alert('HTTP-Error: ' + response.status); // Este Else es en caso de que pegue algún error
    }
  }

  async getUsersFromServer() {
    const url = 'https://localhost:5001/client/users'; // Usar el url como una variable para mantener el orden
    const response = await fetch(url); // Await espera la respuesta y fetch es una vara propia de JS
    if (response.ok) {
      // Parsea lo que sea que me mande como un Json sin importar que sea y lo guarda aqui
      this.users = await response.json();
    } else {
      alert('HTTP-Error: ' + response.status); // Este Else es en caso de que pegue algún error
    }
  }

  // Este metodo agrega empleados
  addEmployee() {

    // Esta parte obtiene los valores de los entries
    const empName = (document.getElementById('e1') as HTMLInputElement).value;
    const empDepartment = (document.getElementById('e2') as HTMLInputElement).value;
    const empId = (document.getElementById('e3') as HTMLInputElement).value;
    const empEMail = (document.getElementById('e4') as HTMLInputElement).value;
    const empPassword = (document.getElementById('e5') as HTMLInputElement).value;

    // Vacio los entries
    (document.getElementById('e1') as HTMLInputElement).value = '';
    (document.getElementById('e2') as HTMLInputElement).value = '';
    (document.getElementById('e3') as HTMLInputElement).value = '';
    (document.getElementById('e4') as HTMLInputElement).value = '';
    (document.getElementById('e5') as HTMLInputElement).value = '';

    axios.post('https://localhost:5001/administrator/employees/insert', {
      name: empName,
      department: empDepartment,
      eMail: empEMail,
      password: empPassword,
      id: empId
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

  // Este metodo agrega nuevas branch
  addBranch() {

    // Esta parte obtiene los valores de los entries
    const brchName = (document.getElementById('b1') as HTMLInputElement).value;
    const brchAddress = (document.getElementById('b2') as HTMLInputElement).value;
    const brchProvince = (document.getElementById('b3') as HTMLInputElement).value;
    const brchPhone = (document.getElementById('b4') as HTMLInputElement).value;
    const brchCity = (document.getElementById('b5') as HTMLInputElement).value;
    const brchBoss = (document.getElementById('b6') as HTMLInputElement).value;
    const brchId = (document.getElementById('b7') as HTMLInputElement).value;

    // Vacio los entries
    (document.getElementById('b1') as HTMLInputElement).value = '';
    (document.getElementById('b2') as HTMLInputElement).value = '';
    (document.getElementById('b3') as HTMLInputElement).value = '';
    (document.getElementById('b4') as HTMLInputElement).value = '';
    (document.getElementById('b5') as HTMLInputElement).value = '';
    (document.getElementById('b6') as HTMLInputElement).value = '';
    (document.getElementById('b7') as HTMLInputElement).value = '';

    axios.post('https://localhost:5001/administrator/branches/insert', {
      name: brchName,
      address: brchAddress,
      province: brchProvince,
      phone: brchPhone,
      boss: brchBoss,
      city: brchCity,
      id: brchId
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

// Metodos de los botones para los workers
  addWorker() { // Metodo para agrergar un nuevo trabajador

    // Variables que recojen los datos directamente del entry
    const wrkrIdName = (document.getElementById('w1') as HTMLInputElement).value;
    const wrkrFullName = (document.getElementById('w2') as HTMLInputElement).value;
    const wrkrBirthday = (document.getElementById('w3') as HTMLInputElement).value;
    const wrkrEntryDay = (document.getElementById('w4') as HTMLInputElement).value;
    const wrkrBranch = (document.getElementById('w5') as HTMLInputElement).value;
    const wrkrHourlyWage = (document.getElementById('w6') as HTMLInputElement).value;
    const wrkrMonthlyWage = (document.getElementById('w7') as HTMLInputElement).value;

    // Este segmento vacia los entries
    (document.getElementById('w1') as HTMLInputElement).value = '';
    (document.getElementById('w2') as HTMLInputElement).value = '';
    (document.getElementById('w3') as HTMLInputElement).value = '';
    (document.getElementById('w4') as HTMLInputElement).value = '';
    (document.getElementById('w5') as HTMLInputElement).value = '';
    (document.getElementById('w6') as HTMLInputElement).value = '';
    (document.getElementById('w7') as HTMLInputElement).value = '';

    axios.post('https://localhost:5001/administrator/workers/insert', {
      idNumber: wrkrIdName,
      fullName: wrkrFullName,
      birthday: wrkrBirthday,
      entryDate: wrkrEntryDay,
      branch: wrkrBranch,
      hourlyWage: wrkrHourlyWage,
      monthlyWage: wrkrMonthlyWage
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

// Este metodo es para agregar sellers
  addSeller() {// Metodo llamado por el boton

    // Esta parte obtiene los valores de los entries
    const selName = (document.getElementById('s1') as HTMLInputElement).value;
    const selIdNumber = (document.getElementById('s2') as HTMLInputElement).value;

    // Vacio los entries
    (document.getElementById('s1') as HTMLInputElement).value = '';
    (document.getElementById('s2') as HTMLInputElement).value = '';

    axios.post('https://localhost:5001/administrator/sellers/insert', {
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
    window.location.reload();
  }


// Este metodo agrega productos
  addProduct() {

    const prodName = (document.getElementById('p1') as HTMLInputElement).value;
    const prodDescription = (document.getElementById('p2') as HTMLInputElement).value;
    const prodBarcode = (document.getElementById('p3') as HTMLInputElement).value;
    const prodSeller = (document.getElementById('p4') as HTMLInputElement).value;
    const prodPrice = (document.getElementById('p5') as HTMLInputElement).value;
    const prodPayTaxes = (document.getElementById('p6') as HTMLInputElement).value;
    const prodPercentageDiscount = (document.getElementById('p7') as HTMLInputElement).value;
    const prodEntryDate = (document.getElementById('p8') as HTMLInputElement).value;
    const prodSales = (document.getElementById('p9') as HTMLInputElement).value;

    // Vacio los entries
    (document.getElementById('p1') as HTMLInputElement).value = '';
    (document.getElementById('p2') as HTMLInputElement).value = '';
    (document.getElementById('p3') as HTMLInputElement).value = '';
    (document.getElementById('p4') as HTMLInputElement).value = '';
    (document.getElementById('p5') as HTMLInputElement).value = '';
    (document.getElementById('p6') as HTMLInputElement).value = '';
    (document.getElementById('p7') as HTMLInputElement).value = '';
    (document.getElementById('p8') as HTMLInputElement).value = '';
    (document.getElementById('p9') as HTMLInputElement).value = '';

    axios.post('https://localhost:5001/administrator/products/insert', {
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
    window.location.reload();
  }

 addRoute() {
   // Esta parte obtiene los valores de los entries
   const rtNumber = (document.getElementById('r1') as HTMLInputElement).value;
   const rtDistrics = (document.getElementById('r2') as HTMLInputElement).value;

   // Vacio los entries
   (document.getElementById('r1') as HTMLInputElement).value = '';
   (document.getElementById('r2') as HTMLInputElement).value = '';

   axios.post('https://localhost:5001/administrator/routes/insert', {
     number: rtNumber,
     districts: rtDistrics
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

 deleteEmployee() {
    // Esta parte obtiene los valores de los entries
   const empName = (document.getElementById('e1') as HTMLInputElement).value;
   const empDepartment = (document.getElementById('e2') as HTMLInputElement).value;
   const empId = (document.getElementById('e3') as HTMLInputElement).value;
   const empEMail = (document.getElementById('e4') as HTMLInputElement).value;
   const empPassword = (document.getElementById('e5') as HTMLInputElement).value;

    // Vacio los entries
   (document.getElementById('e1') as HTMLInputElement).value = '';
   (document.getElementById('e2') as HTMLInputElement).value = '';
   (document.getElementById('e3') as HTMLInputElement).value = '';
   (document.getElementById('e4') as HTMLInputElement).value = '';
   (document.getElementById('e5') as HTMLInputElement).value = '';


   axios.post('https://localhost:5001/administrator/employees/delete', {
      name: empName,
      department: empDepartment,
      eMail: empEMail,
      password: empPassword,
      id: empId
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

  deleteBranches() {
    // Esta parte obtiene los valores de los entries
    const brchName = (document.getElementById('b1') as HTMLInputElement).value;
    const brchAddress = (document.getElementById('b2') as HTMLInputElement).value;
    const brchProvince = (document.getElementById('b3') as HTMLInputElement).value;
    const brchPhone = (document.getElementById('b4') as HTMLInputElement).value;
    const brchCity = (document.getElementById('b5') as HTMLInputElement).value;
    const brchBoss = (document.getElementById('b6') as HTMLInputElement).value;
    const brchId = (document.getElementById('b7') as HTMLInputElement).value;

    // Vacio los entries
    (document.getElementById('b1') as HTMLInputElement).value = '';
    (document.getElementById('b2') as HTMLInputElement).value = '';
    (document.getElementById('b3') as HTMLInputElement).value = '';
    (document.getElementById('b4') as HTMLInputElement).value = '';
    (document.getElementById('b5') as HTMLInputElement).value = '';
    (document.getElementById('b6') as HTMLInputElement).value = '';
    (document.getElementById('b7') as HTMLInputElement).value = '';

    axios.post('https://localhost:5001/administrator/branches/delete', {
      name: brchName,
      address: brchAddress,
      province: brchProvince,
      phone: brchPhone,
      boss: brchBoss,
      city: brchCity,
      id: brchId
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

  deleteWorker() {
    // Variables que recojen los datos directamente del entry
    const wrkrIdName = (document.getElementById('w1') as HTMLInputElement).value;
    const wrkrFullName = (document.getElementById('w2') as HTMLInputElement).value;
    const wrkrBirthday = (document.getElementById('w3') as HTMLInputElement).value;
    const wrkrEntryDay = (document.getElementById('w4') as HTMLInputElement).value;
    const wrkrBranch = (document.getElementById('w5') as HTMLInputElement).value;
    const wrkrHourlyWage = (document.getElementById('w6') as HTMLInputElement).value;
    const wrkrMonthlyWage = (document.getElementById('w7') as HTMLInputElement).value;

    // Este segmento vacia los entries
    (document.getElementById('w1') as HTMLInputElement).value = '';
    (document.getElementById('w2') as HTMLInputElement).value = '';
    (document.getElementById('w3') as HTMLInputElement).value = '';
    (document.getElementById('w4') as HTMLInputElement).value = '';
    (document.getElementById('w5') as HTMLInputElement).value = '';
    (document.getElementById('w6') as HTMLInputElement).value = '';
    (document.getElementById('w7') as HTMLInputElement).value = '';

    axios.post('https://localhost:5001/administrator/workers/delete', {
      idNumber: wrkrIdName,
      fullName: wrkrFullName,
      birthday: wrkrBirthday,
      entryDate: wrkrEntryDay,
      branch: wrkrBranch,
      hourlyWage: wrkrHourlyWage,
      monthlyWage: wrkrMonthlyWage
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

  deleteSeller() {
    // Esta parte obtiene los valores de los entries
    const selName = (document.getElementById('s1') as HTMLInputElement).value;
    const selIdNumber = (document.getElementById('s2') as HTMLInputElement).value;

    // Vacio los entries
    (document.getElementById('s1') as HTMLInputElement).value = '';
    (document.getElementById('s2') as HTMLInputElement).value = '';

    axios.post('https://localhost:5001/administrator/sellers/delete', {
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
    window.location.reload();
  }

  deleteProduct() {
    const prodName = (document.getElementById('p1') as HTMLInputElement).value;
    const prodDescription = (document.getElementById('p2') as HTMLInputElement).value;
    const prodBarcode = (document.getElementById('p3') as HTMLInputElement).value;
    const prodSeller = (document.getElementById('p4') as HTMLInputElement).value;
    const prodPrice = (document.getElementById('p5') as HTMLInputElement).value;
    const prodPayTaxes = (document.getElementById('p6') as HTMLInputElement).value;
    const prodPercentageDiscount = (document.getElementById('p7') as HTMLInputElement).value;
    const prodEntryDate = (document.getElementById('p8') as HTMLInputElement).value;
    const prodSales = (document.getElementById('p9') as HTMLInputElement).value;

    // Vacio los entries
    (document.getElementById('p1') as HTMLInputElement).value = '';
    (document.getElementById('p2') as HTMLInputElement).value = '';
    (document.getElementById('p3') as HTMLInputElement).value = '';
    (document.getElementById('p4') as HTMLInputElement).value = '';
    (document.getElementById('p5') as HTMLInputElement).value = '';
    (document.getElementById('p6') as HTMLInputElement).value = '';
    (document.getElementById('p7') as HTMLInputElement).value = '';
    (document.getElementById('p8') as HTMLInputElement).value = '';
    (document.getElementById('p9') as HTMLInputElement).value = '';

    axios.post('https://localhost:5001/administrator/products/delete', {
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
    window.location.reload();
  }
  deleteRoute() {
    // Esta parte obtiene los valores de los entries
    const rtNumber = (document.getElementById('r1') as HTMLInputElement).value;
    const rtDistrics = (document.getElementById('r2') as HTMLInputElement).value;

    // Vacio los entries
    (document.getElementById('r1') as HTMLInputElement).value = '';
    (document.getElementById('r2') as HTMLInputElement).value = '';

    axios.post('https://localhost:5001/administrator/routes/delete', {
      number: rtNumber,
      districts: rtDistrics
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
}
