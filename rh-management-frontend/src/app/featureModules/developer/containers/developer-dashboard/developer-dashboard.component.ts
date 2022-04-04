import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-developer-dashboard',
  templateUrl: './developer-dashboard.component.html',
  styleUrls: ['./developer-dashboard.component.scss']
})
export class DeveloperDashboardComponent implements OnInit {
  state= true;

  constructor() { }

  ngOnInit(): void {
  }

}
