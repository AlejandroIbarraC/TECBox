import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warehouse-modify',
  templateUrl: './warehouse-modify.component.html',
  styleUrls: ['./warehouse-modify.component.scss']
})
export class WarehouseModifyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  modifyWareHouse(){
     //Get the data from the entries using the id
     const trackId = (document.getElementById('w1') as HTMLInputElement).value;
     const client = (document.getElementById('w2') as HTMLInputElement).value;
     const description = (document.getElementById('w3') as HTMLInputElement).value;
     const deliveryDate = (document.getElementById('w4') as HTMLInputElement).value;
     const status = (document.getElementById('w5') as HTMLInputElement).value;
     const route = (document.getElementById('w6') as HTMLInputElement).value;
     const deliveryMan = (document.getElementById('w7') as HTMLInputElement).value;
   
 
     // This part empties the entries
     (document.getElementById('w1') as HTMLInputElement).value = '';
     (document.getElementById('w2') as HTMLInputElement).value = '';
     (document.getElementById('w3') as HTMLInputElement).value = '';
     (document.getElementById('w4') as HTMLInputElement).value = '';
     (document.getElementById('w5') as HTMLInputElement).value = '';
     (document.getElementById('w6') as HTMLInputElement).value = '';
     (document.getElementById('w7') as HTMLInputElement).value = '';
     (document.getElementById('w8') as HTMLInputElement).value = '';
     (document.getElementById('w9') as HTMLInputElement).value = '';

  }

}
