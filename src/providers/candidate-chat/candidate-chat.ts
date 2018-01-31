import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { UserDataProvider } from '../user-data/user-data';


@Injectable()
export class CandidateChatProvider { 
constructor(public http: Http, ) {

  }


  getChats(token) {
    let myHeaders = new Headers();
    myHeaders.set('Content-Type', 'application/json');
    myHeaders.set('Accept', 'text/plain');
    myHeaders.set('Authorization', token)
    console.log(myHeaders)

    return this.http.get('/pc/attendance/chat_comments', { headers: myHeaders })
    .map(this.extractData)
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data;
  }
}
