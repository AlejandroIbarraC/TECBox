import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-modify-employee',
  templateUrl: './modify-employee.component.html',
  styleUrls: ['./modify-employee.component.scss']
})
export class ModifyEmployeeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  modifyEmployee() {

    const newName = (document.getElementById('me2') as HTMLInputElement).value;
    const newDepartment = (document.getElementById('me3') as HTMLInputElement).value;
    const empId = (document.getElementById('me1') as HTMLInputElement).value;
    const newEMail = (document.getElementById('me4') as HTMLInputElement).value;
    const newPassword = (document.getElementById('me5') as HTMLInputElement).value;

    (document.getElementById('me1') as HTMLInputElement).value = '';
    (document.getElementById('me2') as HTMLInputElement).value = '';
    (document.getElementById('me3') as HTMLInputElement).value = '';
    (document.getElementById('me4') as HTMLInputElement).value = '';
    (document.getElementById('me5') as HTMLInputElement).value = '';

    axios.post('https://localhost:5001/administrator/employees/modify', {
      name: newName,
      department: newDepartment,
      eMail: newEMail,
      password: newPassword,
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
  }
}
