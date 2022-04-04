import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private _http:HttpClient) { }

  getProfileById(id:String){
    return this._http.get(`${environment.API_URL}/employees/${id}`);
  }

  getProfilePic(image:any){
    return this._http.get(`${environment.API_URL}/employees/profilImage/${image}`)
  }
}
