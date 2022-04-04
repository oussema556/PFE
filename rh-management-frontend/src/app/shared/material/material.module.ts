import { NgModule } from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {RouterModule} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSortModule} from "@angular/material/sort";



@NgModule({
  declarations: [],
  imports: [
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatBadgeModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSortModule
  ],
  exports:[
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatBadgeModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSortModule
  ]
})
export class MaterialModule { }
