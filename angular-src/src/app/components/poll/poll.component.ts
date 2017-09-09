import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PollsService} from '../../services/polls.service';
import {AuthService} from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {
   poll;
   pieChartData;
   optionName:String;
  constructor(
    private activeRoute: ActivatedRoute,
    private pollsService:PollsService,
    private authService: AuthService,
    private flash:FlashMessagesService
   ) { }

  ngOnInit() {
    const pollId = this.activeRoute.snapshot.params['pollId'];
    this.pollsService.getPolldetail(pollId).subscribe(
      res =>{
        this.poll = res;
        this.chartUpdate(this.poll);
      })
};
      optionNameFormControl = new FormControl('', [
                Validators.required]);

  chartUpdate(poll){
    let dataTable = [['Options', 'votes']].concat(poll.options.map(key=>{
      return [key.optionName,key.votes];
    }))
    this.pieChartData = {
      chartType: 'PieChart',
      dataTable:dataTable,
      options: {'title': poll.name, width:500,
    height:500},
    };
  }

  onVote(option){
    if(this.authService.loggedIn()){ //if it's a user
      let body = {
        optionId:option._id,
        user: JSON.parse(localStorage.getItem('user')).id
      }
      //check votedusers array
      if(this.poll.votedUsers.includes(body.user)){ //if array has user's vote show message
        this.flash.show('You have already voted',{
            cssClass: 'alert-danger',
            timeout:2500});
      }else{ //else add vote to db
        this.pollsService.addVoteToPoll(body, this.poll._id).subscribe(
          data =>{ this.poll = data;
            this.chartUpdate(this.poll)
          })
      }
    }else{ //if it's not a user
      let body = {
        optionId:option._id
      }
      if(this.pollsService.checkStorage(this.poll._id)){ //check local storage
        this.flash.show('You have already voted',{
            cssClass: 'alert-danger',
            timeout:2500});
      }else{ //add poll's id to localStorage and vote to db
        localStorage.setItem(this.poll._id,'1');
        this.pollsService.addVoteToPoll(body, this.poll._id).subscribe(
          res =>{ this.poll = res;
            this.chartUpdate(this.poll)
          })
      }
    }
  }
    onOptionSubmit(){
      console.log(this.optionName,this.poll._id);
      let body ={ // option name and user id
        name:this.optionName,
        user:JSON.parse(localStorage.getItem('user')).id
      }
      if(this.poll.votedUsers.includes(body.user)){ //if array has user's vote show message
        this.flash.show('You have already voted',{
            cssClass: 'alert-danger',
            timeout:2500});
          }else{this.pollsService.addNewOption(body,this.poll._id).subscribe(
        res =>{
          this.poll = res;
          this.chartUpdate(this.poll)
        }
      )
    }
  }
}
