import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import axios from 'axios';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  welcomeMessage: string;

  constructor(public authService: AuthService) { }

  packages = [{}];

  ngOnInit(): void {
    this.welcomeMessage = 'Welcome, ' + localStorage.getItem('userName');
    document.getElementById('usr1').textContent = localStorage.getItem('userID');
    document.getElementById('usr2').textContent = localStorage.getItem('userEmail');
    document.getElementById('usr3').textContent = localStorage.getItem('userPhone');
    document.getElementById('usr4').textContent = localStorage.getItem('userAddress');
    document.getElementById('usr5').textContent = localStorage.getItem('userProvince');
    document.getElementById('usr6').textContent = localStorage.getItem('userCity');
    this.getUserPackagesFromServer();
  }

  /**
   * Function in charge of logging out of a session
   */
  logOut() {
    this.authService.SignOut();
    localStorage.setItem('userName', 'Log in to see information');
    localStorage.setItem('userID', '');
    localStorage.setItem('userEmail', '');
    localStorage.setItem('userPhone', '');
    localStorage.setItem('userAddress', '');
    localStorage.setItem('userProvince', '');
    localStorage.setItem('userCity', '');
  }

  /**
   * Function in charge of receiving all the packages associated to a user
   */
  async getUserPackagesFromServer() {
    axios.post('https://localhost:5001/warehouse/packages/userPackages', {
      name: localStorage.getItem('userName'),
      idNumber: 'null',
      eMail: 'null',
      password: 'null',
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
        this.packages = response.data;
      })
      .catch(error => {
        console.log(error.response);
      });
  }

}
