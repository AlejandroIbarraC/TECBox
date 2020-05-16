import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/shared/services/auth.service';
import axios from 'axios';
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

  /**
   * Function in charge of logging out of the session
   */
  logOut() {
      localStorage.setItem('userType', 'none');
      this.router.navigate(['/login']);
    }

  /**
   * Function in charge of retrieving the employees list from the database
   */
  async getEmployeesFromServer() {
      const url = 'https://localhost:5001/administrator/employees';
      const response = await fetch(url);
      if (response.ok) {
        this.employees = await response.json();
      } else {
        alert('HTTP-Error: ' + response.status);
      }
    }

  /**
   * Function in charge of retrieving the branches list from the database
   */
  async getBranchesFromServer() {
    const url = 'https://localhost:5001/administrator/branches';
    const response = await fetch(url);
    if (response.ok) {
      this.branches = await response.json();
    } else {
      alert('HTTP-Error: ' + response.status);
    }
  }

  /**
   * Function in charge of retrieving the workers list from the database
   */
  async getWorkersFromServer() {
    const url = 'https://localhost:5001/administrator/workers';
    const response = await fetch(url);
    if (response.ok) {
      this.workers = await response.json();
    } else {
      alert('HTTP-Error: ' + response.status);
    }
  }

  /**
   * Function in charge of retrieving the sellers list from the database
   */
  async getSellersFromServer() {
    const url = 'https://localhost:5001/administrator/sellers';
    const response = await fetch(url);
    if (response.ok) {
      this.sellers = await response.json();
    } else {
      alert('HTTP-Error: ' + response.status);
    }
  }

  /**
   * Function in charge of retrieving the products list from the database
   */
  async getProductsFromServer() {
    const url = 'https://localhost:5001/administrator/products';
    const response = await fetch(url);
    if (response.ok) {
      this.products = await response.json();
    } else {
      alert('HTTP-Error: ' + response.status);
    }
  }

  /**
   * Function in charge of retrieving the routes list from the database
   */
  async getRoutesFromServer() {
    const url = 'https://localhost:5001/administrator/routes';
    const response = await fetch(url);
    if (response.ok) {
      this.routes = await response.json();
    } else {
      alert('HTTP-Error: ' + response.status);
    }
  }

  /**
   * Function in charge of retrieving the users list from the database
   */
  async getUsersFromServer() {
    const url = 'https://localhost:5001/client/users';
    const response = await fetch(url);
    if (response.ok) {
      this.users = await response.json();
    } else {
      alert('HTTP-Error: ' + response.status);
    }
  }

  /**
   * Function in charge of inserting an employee to the database
   */
  addEmployee() {
    const empName = (document.getElementById('e1') as HTMLInputElement).value;
    const empDepartment = (document.getElementById('e2') as HTMLInputElement).value;
    const empId = (document.getElementById('e3') as HTMLInputElement).value;
    const empEMail = (document.getElementById('e4') as HTMLInputElement).value;
    const empPassword = (document.getElementById('e5') as HTMLInputElement).value;

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
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  /**
   * Function in charge of inserting a branch to the database
   */
  addBranch() {
    const brchName = (document.getElementById('b1') as HTMLInputElement).value;
    const brchAddress = (document.getElementById('b2') as HTMLInputElement).value;
    const brchProvince = (document.getElementById('b3') as HTMLInputElement).value;
    const brchPhone = (document.getElementById('b4') as HTMLInputElement).value;
    const brchCity = (document.getElementById('b5') as HTMLInputElement).value;
    const brchBoss = (document.getElementById('b6') as HTMLInputElement).value;
    const brchId = (document.getElementById('b7') as HTMLInputElement).value;

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
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  /**
   * Function in charge of inserting a worker to the database
   */
  addWorker() {
    const wrkrIdName = (document.getElementById('w1') as HTMLInputElement).value;
    const wrkrFullName = (document.getElementById('w2') as HTMLInputElement).value;
    const wrkrBirthday = (document.getElementById('w3') as HTMLInputElement).value;
    const wrkrEntryDay = (document.getElementById('w4') as HTMLInputElement).value;
    const wrkrBranch = (document.getElementById('w5') as HTMLInputElement).value;
    const wrkrHourlyWage = (document.getElementById('w6') as HTMLInputElement).value;
    const wrkrMonthlyWage = (document.getElementById('w7') as HTMLInputElement).value;

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
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  /**
   * Function in charge of inserting a seller to the database
   */
  addSeller() {
    const selName = (document.getElementById('s1') as HTMLInputElement).value;
    const selIdNumber = (document.getElementById('s2') as HTMLInputElement).value;

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
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  /**
   * Function in charge of inserting a product to the database
   */
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
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  /**
   * Function in charge of inserting a route to the database
   */
 addRoute() {
   const rtNumber = (document.getElementById('r1') as HTMLInputElement).value;
   const rtDistrics = (document.getElementById('r2') as HTMLInputElement).value;

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
       window.location.reload();
     })
     .catch(error => {
       console.log(error.response);
     });
 }

  /**
   * Function in charge of inserting an user to the database
   */
  addUser() {
    const usrName = (document.getElementById('u1') as HTMLInputElement).value;
    const usrID = (document.getElementById('u2') as HTMLInputElement).value;
    const usrEMail = (document.getElementById('u3') as HTMLInputElement).value;
    const usrPassword = (document.getElementById('u4') as HTMLInputElement).value;
    const usrPhone = (document.getElementById('u5') as HTMLInputElement).value;
    const usrAddress = (document.getElementById('u6') as HTMLInputElement).value;
    const usrProvince = (document.getElementById('u7') as HTMLInputElement).value;
    const usrCity = (document.getElementById('u8') as HTMLInputElement).value;

    (document.getElementById('u1') as HTMLInputElement).value = '';
    (document.getElementById('u2') as HTMLInputElement).value = '';
    (document.getElementById('u3') as HTMLInputElement).value = '';
    (document.getElementById('u4') as HTMLInputElement).value = '';
    (document.getElementById('u5') as HTMLInputElement).value = '';
    (document.getElementById('u6') as HTMLInputElement).value = '';
    (document.getElementById('u7') as HTMLInputElement).value = '';
    (document.getElementById('u8') as HTMLInputElement).value = '';

    axios.post('https://localhost:5001/client/users/insert', {
      name: usrName,
      idNumber: usrID,
      eMail: usrEMail,
      password: usrPassword,
      phone: usrPhone,
      address: usrAddress,
      province: usrProvince,
      city: usrCity
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
   * Function in charge of deleting an employee from the database
   */
 deleteEmployee() {
   const empName = (document.getElementById('e1') as HTMLInputElement).value;
   const empDepartment = (document.getElementById('e2') as HTMLInputElement).value;
   const empId = (document.getElementById('e3') as HTMLInputElement).value;
   const empEMail = (document.getElementById('e4') as HTMLInputElement).value;
   const empPassword = (document.getElementById('e5') as HTMLInputElement).value;

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
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  /**
   * Function in charge of deleting a branch from the database
   */
  deleteBranches() {
    const brchName = (document.getElementById('b1') as HTMLInputElement).value;
    const brchAddress = (document.getElementById('b2') as HTMLInputElement).value;
    const brchProvince = (document.getElementById('b3') as HTMLInputElement).value;
    const brchPhone = (document.getElementById('b4') as HTMLInputElement).value;
    const brchCity = (document.getElementById('b5') as HTMLInputElement).value;
    const brchBoss = (document.getElementById('b6') as HTMLInputElement).value;
    const brchId = (document.getElementById('b7') as HTMLInputElement).value;

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
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  /**
   * Function in charge of deleting a worker from the database
   */
  deleteWorker() {
    const wrkrIdName = (document.getElementById('w1') as HTMLInputElement).value;
    const wrkrFullName = (document.getElementById('w2') as HTMLInputElement).value;
    const wrkrBirthday = (document.getElementById('w3') as HTMLInputElement).value;
    const wrkrEntryDay = (document.getElementById('w4') as HTMLInputElement).value;
    const wrkrBranch = (document.getElementById('w5') as HTMLInputElement).value;
    const wrkrHourlyWage = (document.getElementById('w6') as HTMLInputElement).value;
    const wrkrMonthlyWage = (document.getElementById('w7') as HTMLInputElement).value;

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
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  /**
   * Function in charge of deleting a seller from the database
   */
  deleteSeller() {
    const selName = (document.getElementById('s1') as HTMLInputElement).value;
    const selIdNumber = (document.getElementById('s2') as HTMLInputElement).value;

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
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  /**
   * Function in charge of deleting a product from the database
   */
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
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  /**
   * Function in charge of deleting a route from the database
   */
  deleteRoute() {
    const rtNumber = (document.getElementById('r1') as HTMLInputElement).value;
    const rtDistrics = (document.getElementById('r2') as HTMLInputElement).value;

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
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  /**
   * Function in charge of deleting an user from the database
   */
  deleteUser() {
    const usrName = (document.getElementById('u1') as HTMLInputElement).value;
    const usrID = (document.getElementById('u2') as HTMLInputElement).value;
    const usrEMail = (document.getElementById('u3') as HTMLInputElement).value;
    const usrPassword = (document.getElementById('u4') as HTMLInputElement).value;
    const usrPhone = (document.getElementById('u5') as HTMLInputElement).value;
    const usrAddress = (document.getElementById('u6') as HTMLInputElement).value;
    const usrProvince = (document.getElementById('u7') as HTMLInputElement).value;
    const usrCity = (document.getElementById('u8') as HTMLInputElement).value;

    (document.getElementById('u1') as HTMLInputElement).value = '';
    (document.getElementById('u2') as HTMLInputElement).value = '';
    (document.getElementById('u3') as HTMLInputElement).value = '';
    (document.getElementById('u4') as HTMLInputElement).value = '';
    (document.getElementById('u5') as HTMLInputElement).value = '';
    (document.getElementById('u6') as HTMLInputElement).value = '';
    (document.getElementById('u7') as HTMLInputElement).value = '';
    (document.getElementById('u8') as HTMLInputElement).value = '';

    axios.post('https://localhost:5001/client/users/delete', {
      name: usrName,
      idNumber: usrID,
      eMail: usrEMail,
      password: usrPassword,
      phone: usrPhone,
      address: usrAddress,
      province: usrProvince,
      city: usrCity
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
