import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../service/shared.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private _activatedRoute:ActivatedRoute,private _sharedService:SharedService) { }
  profile:any;
  id:String="";
  profileImg:any;
  ngOnInit(): void {
    this._activatedRoute
      .params
      .subscribe(
        params=>{
          this.id =params['id'];
        }
      )
    this.getProfile();
  }

  getProfile(){
    this._sharedService.getProfileById(this.id)
      .subscribe(
        res=>{
          console.log(res)
          this.profile=res;
          this.profileImg=`http://localhost:3000/employees/profilImage/${this.profile.profilPic}`;
          //this.getProfilePic(this.profile.profilPic)
          console.log(res)
        }
      )
  }
  getProfilePic(image:any){
    this._sharedService.getProfilePic(image)
      .subscribe(
        res=>{
          console.log("________________")
          console.log(typeof(res))
          //this.profileImg=res;
        }
      )
  }
}
