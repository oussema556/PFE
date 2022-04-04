import {Component, Input, OnInit} from '@angular/core';
import jwt_decode from 'jwt-decode';
import {Router} from "@angular/router";
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Input('state') state!: boolean;

  userSession:any;
  constructor(private _router:Router) { }

  ngOnInit(): void {
    let token: any = localStorage.getItem('token');
    this.userSession = JSON.parse(atob(token.split('.')[1])) as Object;
  }

  logout(){
    localStorage.clear();
    this._router.navigate(['/auth']);
  }

}
