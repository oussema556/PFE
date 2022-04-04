import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamRequestsComponent } from './components/team-requests/team-requests.component';
import { TeamTableComponent } from './components/team-table/team-table.component';
import { ManagerDashboardComponent } from './containers/manager-dashboard/manager-dashboard.component';
import {AppRoutingModule} from "../../app-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {MaterialModule} from "../../shared/material/material.module";



@NgModule({
  declarations: [
    TeamRequestsComponent,
    TeamTableComponent,
    ManagerDashboardComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class ManagerModule { }
