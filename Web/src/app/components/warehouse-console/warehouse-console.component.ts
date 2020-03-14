import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-warehouse-console',
  templateUrl: './warehouse-console.component.html',
  styleUrls: ['./warehouse-console.component.scss']
})
export class WarehouseConsoleComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
