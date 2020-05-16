import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.scss']
})
export class ModifyUserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  modifyUser() {
    // Esta parte obtiene los valores de los entries
    const usrName = (document.getElementById('mu2') as HTMLInputElement).value;
    const usrID = (document.getElementById('mu1') as HTMLInputElement).value;
    const usrEMail = (document.getElementById('mu3') as HTMLInputElement).value;
    const usrPassword = (document.getElementById('mu4') as HTMLInputElement).value;
    const usrPhone = (document.getElementById('mu5') as HTMLInputElement).value;
    const usrAddress = (document.getElementById('mu6') as HTMLInputElement).value;
    const usrProvince = (document.getElementById('mu7') as HTMLInputElement).value;
    const usrCity = (document.getElementById('mu8') as HTMLInputElement).value;

    // Vacio los entries
    (document.getElementById('mu1') as HTMLInputElement).value = '';
    (document.getElementById('mu2') as HTMLInputElement).value = '';
    (document.getElementById('mu3') as HTMLInputElement).value = '';
    (document.getElementById('mu4') as HTMLInputElement).value = '';
    (document.getElementById('mu5') as HTMLInputElement).value = '';
    (document.getElementById('mu6') as HTMLInputElement).value = '';
    (document.getElementById('mu7') as HTMLInputElement).value = '';
    (document.getElementById('mu8') as HTMLInputElement).value = '';

    axios.post('https://localhost:5001/client/users/modify', {
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
      })
      .catch(error => {
        console.log(error.response);
      });
  }

}
