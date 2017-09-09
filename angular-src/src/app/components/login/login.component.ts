import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password:String;

  constructor(
    private router: Router,
    private flash:FlashMessagesService,
    private authService:AuthService
  ) { }

  ngOnInit() {
  }
  usernameFormControl = new FormControl('', [
                  Validators.required]);
  onLoginSubmit(){
    const user = {
      username: this.username,
      password:this.password
    }

    this.authService.authenticateUser(user).subscribe(data =>{
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flash.show('You are now logged in',{
            cssClass: 'alert-success',
            timeout:2500
        });
        this.router.navigate(['/dashboard']);
        }else{
        this.flash.show(data.msg,{
            cssClass: 'alert-danger',
            timeout:2500
          });
          this.router.navigate(['/login']);
      }
    })
  }
}
