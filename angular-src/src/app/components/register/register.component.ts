import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    name: String;
    username: String;
    email:String;
    password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  //Validate email
  emailFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(EMAIL_REGEX)]);
  nameFormControl = new FormControl('', [
          Validators.required]);
  usernameFormControl = new FormControl('', [
                  Validators.required]);

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email:this.email,
      password:this.password
    }
    //Validate Fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fiels', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }


    //Register user
    this.authService.registerUser(user).subscribe(data =>{
      if(data.success){
        this.flashMessage.show('You are now registered!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      }else{
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    })
  }

}
