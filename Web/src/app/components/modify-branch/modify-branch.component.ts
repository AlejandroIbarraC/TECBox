import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-modify-branch',
  templateUrl: './modify-branch.component.html',
  styleUrls: ['./modify-branch.component.scss']
})
export class ModifyBranchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  modifyBranch() {
    const brchName = (document.getElementById('mb2') as HTMLInputElement).value;
    const brchAddress = (document.getElementById('mb3') as HTMLInputElement).value;
    const brchProvince = (document.getElementById('mb4') as HTMLInputElement).value;
    const brchPhone = (document.getElementById('mb5') as HTMLInputElement).value;
    const brchCity = (document.getElementById('mb6') as HTMLInputElement).value;
    const brchBoss = (document.getElementById('mb7') as HTMLInputElement).value;
    const brchId = (document.getElementById('mb1') as HTMLInputElement).value;

    // Vacio los entries
    (document.getElementById('mb1') as HTMLInputElement).value = '';
    (document.getElementById('mb2') as HTMLInputElement).value = '';
    (document.getElementById('mb3') as HTMLInputElement).value = '';
    (document.getElementById('mb4') as HTMLInputElement).value = '';
    (document.getElementById('mb5') as HTMLInputElement).value = '';
    (document.getElementById('mb6') as HTMLInputElement).value = '';
    (document.getElementById('mb7') as HTMLInputElement).value = '';

    axios.post('https://localhost:5001/administrator/branches/modify', {
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
  }

}
