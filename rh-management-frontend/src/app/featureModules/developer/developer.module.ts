import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeveloperDashboardComponent } from './containers/developer-dashboard/developer-dashboard.component';
import {SharedModule} from "../../shared/shared.module";
import {MaterialModule} from "../../shared/material/material.module";



@NgModule({
  declarations: [
    DeveloperDashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ]
})
export class DeveloperModule { }
