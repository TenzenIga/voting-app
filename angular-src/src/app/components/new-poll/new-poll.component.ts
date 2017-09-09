import { Component, OnInit } from '@angular/core';
import {PollsService} from '../../services/polls.service';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import {Poll} from '../../poll';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';
@Component({
  selector: 'app-new-poll',
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.css']
})
export class NewPollComponent implements OnInit {
  body:any
  public myForm: FormGroup; // our form model
  constructor(
    private pollservice:PollsService,
    private _fb: FormBuilder,
    private flash:FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.myForm = this._fb.group({
      name:['',[Validators.required, Validators.minLength(2)]],
      options: this._fb.array([
        this.initOption(),
        this.initOption(),
      ])
    });

}
  initOption(){
    return this._fb.group({
      optionName:['', Validators.required]
    });
  }
  addOption(){
    //add new option
    const control = <FormArray>this.myForm.controls['options'];
    control.push(this.initOption());
  }
  removeOption(i:number){
    //remove option from the list
    const control = <FormArray>this.myForm.controls['options'];
    control.removeAt(i);
  }
  save(model:Poll){
    const body = <FormArray>this.myForm.value; //get object with Poll name and options
    this.body = body;
    const userId =JSON.parse(localStorage.getItem("user")).id; // get userId
    this.body.user = userId;
    this.pollservice.makeNewPoll(this.body).subscribe( //making post request
      res=>{
      if(res.success){
        this.flash.show(res.msg,{
            cssClass: 'alert-success',
            timeout:2500
        })
      this.router.navigate(['']);
      }else{
        this.flash.show(res.msg,{
            cssClass: 'alert-danger',
            timeout:2500
        })
      }
    }
    )

  }
}
