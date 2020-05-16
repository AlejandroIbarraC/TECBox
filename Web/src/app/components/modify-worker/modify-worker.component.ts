import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-modify-worker',
  templateUrl: './modify-worker.component.html',
  styleUrls: ['./modify-worker.component.scss']
})
export class ModifyWorkerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Function in charge of modifying a work in the database
   */
  modifyWorker() {
    const wrkrIdName = (document.getElementById('mw1') as HTMLInputElement).value;
    const wrkrFullName = (document.getElementById('mw2') as HTMLInputElement).value;
    const wrkrBirthday = (document.getElementById('mw3') as HTMLInputElement).value;
    const wrkrEntryDay = (document.getElementById('mw4') as HTMLInputElement).value;
    const wrkrBranch = (document.getElementById('mw5') as HTMLInputElement).value;
    const wrkrHourlyWage = (document.getElementById('mw6') as HTMLInputElement).value;
    const wrkrMonthlyWage = (document.getElementById('mw7') as HTMLInputElement).value;

    (document.getElementById('mw1') as HTMLInputElement).value = '';
    (document.getElementById('mw2') as HTMLInputElement).value = '';
    (document.getElementById('mw3') as HTMLInputElement).value = '';
    (document.getElementById('mw4') as HTMLInputElement).value = '';
    (document.getElementById('mw5') as HTMLInputElement).value = '';
    (document.getElementById('mw6') as HTMLInputElement).value = '';
    (document.getElementById('mw7') as HTMLInputElement).value = '';

    axios.post('https://localhost:5001/administrator/workers/modify', {
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
  }

}
