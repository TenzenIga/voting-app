import { Component, Input } from '@angular/core';
import { FormGroup,FormArray } from '@angular/forms';
import {Poll, Option} from '../../poll';
@Component({
  moduleId: module.id,
  selector: 'app-new-poll-option',
  templateUrl: './new-poll-option.component.html',
  styleUrls: ['./new-poll-option.component.css']
})
export class NewPollOptionComponent{
  @Input('group')
  optionForm: FormGroup;
  constructor() { }

  ngOnInit() {
  }
}
