import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import {HttpModule} from '@angular/http';
import {AuthGuard} from './guards/auth.guard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import {MdIconModule} from '@angular/material';
import {MdListModule} from '@angular/material';
import {MdCardModule} from '@angular/material';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {PollsService} from './services/polls.service';
import { PollComponent } from './components/poll/poll.component';
import { NewPollComponent } from './components/new-poll/new-poll.component';
import { NewPollOptionComponent } from './components/new-poll-option/new-poll-option.component';


const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'polls/:pollId', component:PollComponent},
  {path:'newpoll', component:NewPollComponent, canActivate:[AuthGuard]}
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    DashboardComponent,
    PollComponent,
    NewPollComponent,
    NewPollOptionComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MdInputModule,
    MdCardModule,
    MdIconModule,
    MdListModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MdButtonModule,
    Ng2GoogleChartsModule
  ],
  providers: [ValidateService, AuthService, AuthGuard,PollsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
