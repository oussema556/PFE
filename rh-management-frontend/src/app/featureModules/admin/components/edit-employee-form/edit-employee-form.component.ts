import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-employee-form',
  templateUrl: './edit-employee-form.component.html',
  styleUrls: ['./edit-employee-form.component.scss']
})
export class EditEmployeeFormComponent implements OnInit {

  employeeId:String="";
  editForm= new FormGroup({
    jobTitle:new FormControl('',[Validators.required]),
    contractType:new FormControl('',[Validators.required]),
    newSalary:new FormControl('',[Validators.required])
  });
  constructor(private _router:Router,private _adminService:AdminService,private _activatedRoute:ActivatedRoute) { }
  ngOnInit(): void {
      this.employeeId=this._activatedRoute.snapshot.params['id'];
  }


  saveProfile() {
    this._adminService.updateEmployee(this.employeeId,
      {
        "jobTitle": this.editForm.get('jobTitle')?.value,
        "contractType": this.editForm.get('contractType')?.value,
        "currentSalary": +this.editForm.get('newSalary')?.value
      })
      .subscribe(
        (res:any)=>{
            this._router.navigate( ['/employee/admin/viewProfile',this.employeeId]);
        },
        res=>{
          console.log(res.message)
        }
      )
  }
}
