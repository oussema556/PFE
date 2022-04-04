import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthGuard} from "./auth.guard";
import {AuthService} from "../../featureModules/auth/service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _authGuard:AuthGuard,private _authService:AuthService,private _router:Router) {
  }
  canActivate() {
    if(!this._authGuard.canActivate()){
      this._router.navigate(['auth'])
    }
    else if(this._authService.getRole()==='ADMINISTRATOR'){
      return true
    }
    else {
      this._router.navigate(['no-permission'])
      return false;
    }
    return true;
  }

}
