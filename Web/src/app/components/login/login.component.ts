import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userType: string;

  constructor(
    public authService: AuthService
    ) { }

  ngOnInit(): void {
  }

  logIn(email: string, password: string, userType: string) {
    this.authService.SignIn(email, password, userType);
  }

}
