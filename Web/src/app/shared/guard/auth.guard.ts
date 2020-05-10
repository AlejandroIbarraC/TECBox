import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../../shared/services/auth.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  
  constructor(
    public authService: AuthService,
    public router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    var userType = localStorage.getItem('userType');
    if (this.authService.isLoggedIn !== true) {
      this.router.navigate(['login']);
    }

    this.navigateToUserPage(userType);

    if (this.router.url === '/admin' && userType != "admin"){
      this.redirectToUserPage(userType);
    }

    return true;
  }

  navigateToUserPage(userType) {
    if (userType == "admin") {
      this.router.navigate(['admin']);
    } else if (userType == "warehouse") {
      this.router.navigate(['warehouse-console']);
    } else if (userType == "delivery") {
      this.router.navigate(['delivery-console']);
    }
  }

  redirectToUserPage(userType) {
    if (userType == "admin") {
      this.router.navigate(['admin']);
    } else if (userType == "warehouse") {
      this.router.navigate(['warehouse-console']);
    } else if (userType == "delivery") {
      this.router.navigate(['delivery-console']);
    }
  }

}