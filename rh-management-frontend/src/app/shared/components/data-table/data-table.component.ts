import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {DynamicValue} from "@angular/compiler-cli/src/ngtsc/partial_evaluator";
import {MatTableDataSource} from "@angular/material/table";
import {Employee} from "../../models/employee";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnChanges {

  @Input('dataType') dataType:String="";
  @Input('data') data: Employee[] = [];
  @Input('meta') meta: any;
  @Input('columns') columns: any;
  @Output('getAllEmployees') getAllEmployees = new EventEmitter<number>();
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource.sort=this.sort;
  }


  dataSource: MatTableDataSource<Employee> = new MatTableDataSource()

  ngOnInit(): void {

  }


  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource= new MatTableDataSource(this.data)
  }
  counter(i: number) {
    return new Array(i);
  }

  empWithPage(pageNumber:number) {
    this.getAllEmployees.emit(pageNumber);
  }
}
