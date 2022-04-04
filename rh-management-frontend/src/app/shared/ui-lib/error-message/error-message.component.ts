import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ui-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {
  @Input('errorMessage') errorMessage:String="";
  @Input('errorType') errorType:String="";
  constructor() { }

  ngOnInit(): void {
  }

}
