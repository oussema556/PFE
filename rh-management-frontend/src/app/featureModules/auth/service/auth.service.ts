import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  login(userCreds:any){
    return this._http.post(`${environment.API_URL}/login`,userCreds);
  }
  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getRole(){
    if (localStorage.getItem('token')) {
      let token: any = localStorage.getItem('token');
      let user = JSON.parse(atob(token.split('.')[1]));
      return user.role.toUpperCase();
    }
    return "";
  }

}
