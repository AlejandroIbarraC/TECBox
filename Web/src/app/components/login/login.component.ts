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


  getsingleAdminData(){
    const email = (document.getElementById('tres') as HTMLInputElement).value;
    const password = (document.getElementById('cuatro') as HTMLInputElement).value;
  }

  getsingleMemberData(){
    const email = (document.getElementById('uno') as HTMLInputElement).value;
    const password = (document.getElementById('dos') as HTMLInputElement).value;
  }

  getsingleRegisterData(){
    const name = (document.getElementById('cinco') as HTMLInputElement).value;
    const id = (document.getElementById('seis') as HTMLInputElement).value;
    const email = (document.getElementById('siete') as HTMLInputElement).value;
    const password = (document.getElementById('ocho') as HTMLInputElement).value;
    const phone = (document.getElementById('nueve') as HTMLInputElement).value;
    const address = (document.getElementById('diez') as HTMLInputElement).value;
    const province = (document.getElementById('once') as HTMLInputElement).value;
    const city = (document.getElementById('doce') as HTMLInputElement).value;
  }
}
