import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AdminService} from "../../../featureModules/admin/service/admin.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output('searchEmployees') searchEmployees = new EventEmitter<any>();
  selectedManager: any;
  managers:any[]=[];
  keyword: any;
  constructor(private _adminService:AdminService) { }

  ngOnInit(): void {
    this.getManagers();
  }

  searchForEmployees(event?:any){
    this.searchEmployees.emit({keyword:this.keyword,managerId: this.selectedManager})
  }

  getManagers(){
    this._adminService.getManagers()
      .subscribe(
        (res:any)=>{
          res.forEach((manager:any)=>{
            this.managers.push(manager)
          })
        },
        (err:Error)=>{
          console.log(err)
        }
      )
  }
}
