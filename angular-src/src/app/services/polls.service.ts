import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from "RxJS/Rx";
import 'rxjs/add/operator/map';
import {AuthService} from '../services/auth.service';
@Injectable()
export class PollsService {
  authToken:any;
  user:any;
  constructor(private http:Http, private authService:AuthService) { }

  getPolldetail(pollId): Observable<any>{ // get poll page
    const url = 'polls/' + pollId;
    return this.http.get(url).map(res => res.json())

  }
  getUserPolls(userId){
    let headers = new Headers();
      headers.append('Authorization', localStorage.getItem('id_token'));
    headers.append('Content-Type', 'application/json');
    return this.http.get("dashboard/" + userId,{headers: headers}).map(
        res =>{
      return  res.json();
        }
      )
  }
  getPolls(): Observable<any> { //get  all polls from db
  return this.http.get("home").map(
      res =>{
    return  res.json();
      }
    )
  }
  //Delete poll
  deletePoll(id){
    let headers = new Headers();
      headers.append('Authorization', localStorage.getItem('id_token'));
    headers.append('Content-Type', 'application/json');
    let ur = "polls/" + id;
    return this.http.delete(ur,{headers: headers}).map(
      res =>{ res.json()
    })
  }
  addVoteToPoll(body, id) { //upgrade poll
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ur = "polls/" + id;
    return this.http.put(ur, body, headers).map(
        res => res.json()
        )
}
  //creating new poll
  makeNewPoll(body){
    let headers = new Headers();
    headers.append('Authorization', localStorage.getItem('id_token'));
    headers.append('Content-Type', 'application/json');
    return this.http.post("/", body,{headers: headers}).map(
      res =>{
      return res.json()
     }
    )}
    //add new option
    addNewOption(body, id){
      let headers = new Headers();
      headers.append('Authorization', localStorage.getItem('id_token'));
      headers.append('Content-Type', 'application/json');
      return this.http.put(id, body,{headers: headers}).map(
          res => res.json()
          )
    }
  checkStorage(id){
    let a = localStorage.getItem(id);
    if(a){
      return true;
    }else{
        return false
    }
}

}
