import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-modify-route',
  templateUrl: './modify-route.component.html',
  styleUrls: ['./modify-route.component.scss']
})
export class ModifyRouteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  modifyRoute() {
    const rtNumber = (document.getElementById('mr1') as HTMLInputElement).value;
    const rtDistrics = (document.getElementById('mr2') as HTMLInputElement).value;

    // Vacio los entries
    (document.getElementById('mr1') as HTMLInputElement).value = '';
    (document.getElementById('mr2') as HTMLInputElement).value = '';

    axios.post('https://localhost:5001/administrator/routes/modify', {
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
  }

}
