import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AdminGuardGuard {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('adminToken')) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
