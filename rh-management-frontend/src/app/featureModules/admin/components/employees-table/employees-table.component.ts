import { Component, OnInit } from '@angular/core';
import {Employee} from "../../../../shared/models/employee";
import {AdminService} from "../../service/admin.service";

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss']
})
export class EmployeesTableComponent implements OnInit {
  managers: any;
  selectedManager: any;
  columns = [
    "id",
    "firstName",
    "lastName",
    "email",
    "contractType",
    "currentSalary",
    "manager",
    "action"
  ];
  data: any;
  meta: any;
  private employees: any[]=[];

  constructor(private _adminService:AdminService) {
  }

  ngOnInit(){
    this.getAllEmployees();
  }

  pipeEmployees(data: any) {
    this.employees = []
    data.forEach((employee: any) => {

      let emp: Employee = {
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        contractType: employee.contractType,
        currentSalary: employee.currentSalary,
        manager: employee.manager.firstName + " " + employee.manager.lastName
      }
      this.employees.push(emp);
    })
  }

  getAllEmployees(pageNumber?: number) {
    this.employees=[]
   this._adminService
      .getAllEmployees(pageNumber)
      .subscribe(
        (res: any) => {
          this.pipeEmployees(res.items);
          this.data = this.employees;
          this.meta = res.meta
          console.log(this.data)
        },
        (err) => {
          console.log(err);
        }
      );
  }

  searchEmployess(value:any) {
    this.employees=[];
    if (value.keyword && !value.managerId){
      this._adminService.searchEmployees(value.keyword)
        .subscribe(
          (res:any)=>{
            this.pipeEmployees(res.items);
            this.data = this.employees;
            console.log(res.items)
            this.meta = res.meta
          }
        )
    }
    else if (!value.keyword && value.managerId){
      this._adminService.searchByManager(value.managerId)
        .subscribe(
          (res:any)=>{
            this.pipeEmployees(res.items);
            this.data = this.employees;
            console.log(res.items)
            this.meta = res.meta
          }
        )
    }
    else if (value.keyword && value.managerId){
      this._adminService.searchEmployeesByManagerAndName(value.keyword,value.managerId)
        .subscribe(
          (res:any)=>{
            this.pipeEmployees(res.items);
            this.data = this.employees;
            console.log(res.items)
            this.meta = res.meta
          }
        )
    }
    else
      this.getAllEmployees()

  }


  SearchByManager() {

  }


}
