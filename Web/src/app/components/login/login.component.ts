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
    // CONNECT TO SERVER AND VERIFY IF TEAM MEMBER EXISTS

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

  logInUser() {
    // Get information and store it in a const
    const email = (document.getElementById('userEmail') as HTMLInputElement).value;
    const password = (document.getElementById('userPassword') as HTMLInputElement).value;

    // Empty all entries
    (document.getElementById('userEmail') as HTMLInputElement).value = '';
    (document.getElementById('userPassword') as HTMLInputElement).value = '';

    // CONNECT TO SERVER AND VERIFY IF USER EXISTS

    // Log in using Firebase (ONLY IF USER EXISTS IN SERVER)
    this.authService.SignIn(email, password);
  }

  onItemChange(value) {
    this.userType = value;
  }

  register() {
    // Get information and store it in a const
    const name = (document.getElementById('r1') as HTMLInputElement).value;
    const id = (document.getElementById('r2') as HTMLInputElement).value;
    const email = (document.getElementById('r3') as HTMLInputElement).value;
    const password = (document.getElementById('r4') as HTMLInputElement).value;
    const phone = (document.getElementById('r5') as HTMLInputElement).value;
    const address = (document.getElementById('r6') as HTMLInputElement).value;
    const province = (document.getElementById('r7') as HTMLInputElement).value;
    const city = (document.getElementById('r8') as HTMLInputElement).value;

    // Register user in Firebase
    this.authService.SignUp(email, password);

    // Empty all entries
    (document.getElementById('r1') as HTMLInputElement).value = '';
    (document.getElementById('r2') as HTMLInputElement).value = '';
    (document.getElementById('r3') as HTMLInputElement).value = '';
    (document.getElementById('r4') as HTMLInputElement).value = '';
    (document.getElementById('r5') as HTMLInputElement).value = '';
    (document.getElementById('r6') as HTMLInputElement).value = '';
    (document.getElementById('r7') as HTMLInputElement).value = '';
    (document.getElementById('r8') as HTMLInputElement).value = '';

    // CONNECT TO SERVER AND POST NEW REGISTERED USER DATA
  }

}
