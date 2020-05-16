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

  /**
   * Function in charge of logging in a team member
   * @param empEmail email of the team member
   * @param empPassword password of the team member
   */
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
            document.getElementById('errorLabelTeam').textContent = '';
          } else {
            document.getElementById('errorLabelTeam').textContent = 'Wrong email, password or department';
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
            document.getElementById('errorLabelTeam').textContent = '';
          } else {
            document.getElementById('errorLabelTeam').textContent = 'Wrong email, password or department';
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
            document.getElementById('errorLabelTeam').textContent = '';
          } else {
            document.getElementById('errorLabelTeam').textContent = 'Wrong email, password or department';
          }
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }

  /**
   * Function in charge of logging in a user
   */
  logInUser() {
    const usrEmail = (document.getElementById('userEmail') as HTMLInputElement).value;
    const usrPassword = (document.getElementById('userPassword') as HTMLInputElement).value;

    (document.getElementById('userEmail') as HTMLInputElement).value = '';
    (document.getElementById('userPassword') as HTMLInputElement).value = '';

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
          localStorage.setItem('userName', response.data.name);
          localStorage.setItem('userID', response.data.idNumber);
          localStorage.setItem('userEmail', response.data.eMail);
          localStorage.setItem('userPassword', response.data.password);
          localStorage.setItem('userPhone', response.data.phone);
          localStorage.setItem('userAddress', response.data.address);
          localStorage.setItem('userProvince', response.data.province);
          localStorage.setItem('userCity', response.data.city);
          this.authService.SignIn(usrEmail, usrPassword);
          document.getElementById('errorLabeluUser').textContent = '';
        } else {
          document.getElementById('errorLabelUser').textContent = 'Wrong email or password';
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  /**
   * Function in charge of detecting the type of employee trying to logging in
   * @param value department where the employee works
   */
  onItemChange(value) {
    this.userType = value;
  }

  /**
   * Function in charge of registering a user
   */
  register() {
    const usrName = (document.getElementById('r1') as HTMLInputElement).value;
    const usrId = (document.getElementById('r2') as HTMLInputElement).value;
    const usrEmail = (document.getElementById('r3') as HTMLInputElement).value;
    const usrPassword = (document.getElementById('r4') as HTMLInputElement).value;
    const usrPhone = (document.getElementById('r5') as HTMLInputElement).value;
    const usrAddress = (document.getElementById('r6') as HTMLInputElement).value;
    const usrProvince = (document.getElementById('r7') as HTMLInputElement).value;
    const usrCity = (document.getElementById('r8') as HTMLInputElement).value;

    (document.getElementById('r1') as HTMLInputElement).value = '';
    (document.getElementById('r2') as HTMLInputElement).value = '';
    (document.getElementById('r3') as HTMLInputElement).value = '';
    (document.getElementById('r4') as HTMLInputElement).value = '';
    (document.getElementById('r5') as HTMLInputElement).value = '';
    (document.getElementById('r6') as HTMLInputElement).value = '';
    (document.getElementById('r7') as HTMLInputElement).value = '';
    (document.getElementById('r8') as HTMLInputElement).value = '';

    if (usrPassword.length > 5 && usrEmail.includes('@')) {
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
          this.authService.SignUp(usrEmail, usrPassword);
        })
        .catch(error => {
          console.log(error.response);
        });
    } else {
      console.log('Something happened, try again with a longer password or a valid email');
    }
  }

}
