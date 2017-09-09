import { Component, OnInit } from '@angular/core';
import {PollsService} from '../../services/polls.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  polls;
  userId;
  constructor(
  private pollsService:PollsService,
  private router:Router
  ) { }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem("user")).id;
    this.pollsService.getUserPolls(this.userId).subscribe(
      res=>{
        this.polls = res;
    console.log(this.polls);
      }
    );
  }
    showPollDetail(poll){
      this.router.navigate(['polls', poll._id]);
    }
    removePoll(pollId){
      this.pollsService.deletePoll(pollId).subscribe(
            res=>res
          )
      this.polls = this.polls.filter(item=>{
              return item._id!== pollId;})

  }
  newPoll(){
    this.router.navigate(['newpoll']);
  }
  twitterShare(poll){
    window.open('https://twitter.com/intent/tweet?text=' + poll.name + " https://meanvoting-app.herokuapp.com/polls/" +poll._id, '_blank')
  }
}
