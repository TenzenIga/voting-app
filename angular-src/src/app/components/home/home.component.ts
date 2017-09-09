import {Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {PollsService} from '../../services/polls.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  polls;
  constructor(private router:Router, private pollsService: PollsService) { }

  ngOnInit() {
    this.pollsService.getPolls().subscribe(
      res=>{
        this.polls = res;
      }
    );
  }
  showPollDetail(poll){
    this.router.navigate(['pollspage', poll._id]);
  }
}
