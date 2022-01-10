import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _router: Router) { }  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {  
        if (localStorage.getItem('token')) {  
            return true;  
        }  
        this._router.navigate(['/']);  
        return false;  
    }  
}