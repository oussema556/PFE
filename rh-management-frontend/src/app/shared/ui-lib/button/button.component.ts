import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() buttonType: String="";
  @Input() buttonContent:String="";

  constructor() { }

  ngOnInit(): void {
  }

}
