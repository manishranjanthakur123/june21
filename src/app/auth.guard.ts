import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../app/services/auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router){}
  canActivate(){
    if(this._authService.loggedIn()){
      return true;
    }
    else{
      this._router.navigate(['/login',]);
      return false;
    }
  }
  
}
