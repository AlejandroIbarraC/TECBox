import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userType: string;

  constructor(
    public authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  logInTeam(email: string, password: string) {
    // ADD SERVER VERIFICATION HERE
    if (this.userType == "admin") {
      this.router.navigateByUrl('/admin');
      localStorage.setItem('userType', 'admin')
    } else if (this.userType == "warehouse") {
      this.router.navigateByUrl('/warehouse-console');
      localStorage.setItem('userType', 'warehouse')
    } else if (this.userType == "delivery") {
      this.router.navigateByUrl('/delivery-console');
      localStorage.setItem('userType', 'delivery')
    }
  }

  logInUser(email: string, password: string) {
    this.authService.SignIn(email, password);
  }

  onItemChange(value) {
    this.userType = value;
  }

  register(email: string, password: string) {
    this.authService.SignUp(email, password)
  }

}
