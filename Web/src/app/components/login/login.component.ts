import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userType: string;

  constructor(
    public authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  logInTeam(empEmail: string, empPassword: string) {
    // tslint:disable-next-line:triple-equals
    if (this.userType == 'admin') {
      axios.post('https://localhost:5001/administrator/employees/check', {
        name: 'null',
        department: 'Administration',
        eMail: empEmail,
        password: empPassword,
        id: 'null'
      }, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      })
        .then(response => {
          console.log(response);
          // tslint:disable-next-line:triple-equals
          if (response.data.name != 'null') {
            this.router.navigateByUrl('/admin');
            localStorage.setItem('userType', 'admin');
          } else {
            console.log('Something happened, try again');
          }
        })
        .catch(error => {
          console.log(error.response);
        });
      // tslint:disable-next-line:triple-equals
    } else if (this.userType == 'warehouse') {
      axios.post('https://localhost:5001/administrator/employees/check', {
        name: 'null',
        department: 'Warehouse',
        eMail: empEmail,
        password: empPassword,
        id: 'null'
      }, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      })
        .then(response => {
          console.log(response);
          // tslint:disable-next-line:triple-equals
          if (response.data.name != 'null') {
            this.router.navigateByUrl('/warehouse-console');
            localStorage.setItem('userType', 'warehouse');
          } else {
            console.log('Something happened, try again');
          }
        })
        .catch(error => {
          console.log(error.response);
        });
      // tslint:disable-next-line:triple-equals
    } else if (this.userType == 'delivery') {
      axios.post('https://localhost:5001/administrator/employees/check', {
        name: 'null',
        department: 'Delivery',
        eMail: empEmail,
        password: empPassword,
        id: 'null'
      }, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      })
        .then(response => {
          console.log(response);
          // tslint:disable-next-line:triple-equals
          if (response.data.name != 'null') {
            this.router.navigateByUrl('/delivery-console');
            localStorage.setItem('userType', 'delivery');
          } else {
            console.log('Something happened, try again');
          }
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }

  logInUser() {
    // Get information and store it in a const
    const usrEmail = (document.getElementById('userEmail') as HTMLInputElement).value;
    const usrPassword = (document.getElementById('userPassword') as HTMLInputElement).value;

    // Empty all entries
    (document.getElementById('userEmail') as HTMLInputElement).value = '';
    (document.getElementById('userPassword') as HTMLInputElement).value = '';

    // CONNECT TO SERVER AND VERIFY IF USER EXISTS
    axios.post('https://localhost:5001/client/users/information', {
      name: 'null',
      idNumber: 'null',
      eMail: usrEmail,
      password: usrPassword,
      phone: 'null',
      address: 'null',
      province: 'null',
      city: 'null'
    }, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => {
        console.log(response);
        // tslint:disable-next-line:triple-equals
        if (response.data.name != 'null') {
          // Log in using Firebase (ONLY IF USER EXISTS IN SERVER)
          localStorage.setItem('userName', response.data.name);
          localStorage.setItem('userID', response.data.idNumber);
          localStorage.setItem('userEmail', response.data.eMail);
          localStorage.setItem('userPassword', response.data.password);
          localStorage.setItem('userPhone', response.data.phone);
          localStorage.setItem('userAddress', response.data.address);
          localStorage.setItem('userProvince', response.data.province);
          localStorage.setItem('userCity', response.data.city);
          this.authService.SignIn(usrEmail, usrPassword);
        } else {
          // SHOW ERROR MESSAGE
          console.log('Something happened, the user could not be found');
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  onItemChange(value) {
    this.userType = value;
  }

  register() {
    // Get information and store it in a const
    const usrName = (document.getElementById('r1') as HTMLInputElement).value;
    const usrId = (document.getElementById('r2') as HTMLInputElement).value;
    const usrEmail = (document.getElementById('r3') as HTMLInputElement).value;
    const usrPassword = (document.getElementById('r4') as HTMLInputElement).value;
    const usrPhone = (document.getElementById('r5') as HTMLInputElement).value;
    const usrAddress = (document.getElementById('r6') as HTMLInputElement).value;
    const usrProvince = (document.getElementById('r7') as HTMLInputElement).value;
    const usrCity = (document.getElementById('r8') as HTMLInputElement).value;

    // Empty all entries
    (document.getElementById('r1') as HTMLInputElement).value = '';
    (document.getElementById('r2') as HTMLInputElement).value = '';
    (document.getElementById('r3') as HTMLInputElement).value = '';
    (document.getElementById('r4') as HTMLInputElement).value = '';
    (document.getElementById('r5') as HTMLInputElement).value = '';
    (document.getElementById('r6') as HTMLInputElement).value = '';
    (document.getElementById('r7') as HTMLInputElement).value = '';
    (document.getElementById('r8') as HTMLInputElement).value = '';

    if (usrPassword.length > 5 && usrEmail.includes('@')) {
      // CONNECT TO SERVER AND POST NEW REGISTERED USER DATA
      axios.post('https://localhost:5001/client/users/insert', {
        name: usrName,
        idNumber: usrId,
        eMail: usrEmail,
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
        })
        .catch(error => {
          console.log(error.response);
        });

      // Register user in Firebase
      this.authService.SignUp(usrEmail, usrPassword);
    } else {
      // SHOW ERROR MESSAGE
      console.log('Something happened, try again with a longer password or a valid email');
    }
  }

}
