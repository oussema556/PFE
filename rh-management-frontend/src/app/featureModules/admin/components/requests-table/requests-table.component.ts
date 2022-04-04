import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requests-table',
  templateUrl: './requests-table.component.html',
  styleUrls: ['./requests-table.component.scss']
})
export class RequestsTableComponent implements OnInit {

  data:any;
  columns=["id","subject","leaver","start date","end date","actions"];
  meta:any;

  constructor() { }

  ngOnInit(): void {
  }

  getAllRequests($event: number) {

  }
  searchRequests($event: number){}

}
