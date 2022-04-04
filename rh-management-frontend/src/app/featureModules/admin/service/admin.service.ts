import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http: HttpClient) { }

  getAllEmployees(pageNumber?:number):Observable<any>{
    return this._http.get(`${environment.API_URL}/admin/employees?page=${pageNumber}`);
  }

  searchEmployees(name:any){
    return this._http.get(`${environment.API_URL}/admin/employees/search/${name}`)
  }

  getManagers(){
    return this._http.get(`${environment.API_URL}/admin/employees/managersList/get`)
  }

  searchByManager(id:any){
    return this._http.get(`${environment.API_URL}/admin/employees/searchByManagerId/${id}`)
  }
  searchEmployeesByManagerAndName(keyword: any, managerId: any) {
    return this._http.get(`${environment.API_URL}/admin/employees/search/${keyword}/${managerId}`)
  }
  updateEmployee(id:any,data:any){
    return this._http.patch(`${environment.API_URL}/admin/employees/jobHistory/${id}`,data);
  }


}
