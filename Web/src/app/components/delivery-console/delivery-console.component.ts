import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-delivery-console',
  templateUrl: './delivery-console.component.html',
  styleUrls: ['./delivery-console.component.scss']
})
export class DeliveryConsoleComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
