import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthService
    ) { }

  ngOnInit(): void {
  }

  logIn(email: string, password: string, type: number) {
    this.authService.SignIn(email, password);
  }

}
