import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  items = [{"trackingID":123321,"client":"Ale","description":"Pandora\u0027s Box","deliveryDate":"4/5/2020","status":"On the way"},{"trackingID":456654,"client":"Kevin","description":"Chest","deliveryDate":"3/12/2020","status":"Customs"},{"trackingID":963366,"client":"Kevin","description":"Chest","deliveryDate":"3/12/2020","status":"Customs"},{"trackingID":489987,"client":"Jose","description":"Box Concept","deliveryDate":"8/8/2030","status":"Customs"}]

  constructor() { }

  ngOnInit(): void {
    
  }

}
