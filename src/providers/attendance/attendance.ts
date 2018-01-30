import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { UserDataProvider } from '../user-data/user-data';

@Injectable()
export class AttendanceProvider {

  constructor(public http: Http, private service:UserDataProvider) {

  }

  getAttendances(token){
    let myHeaders = new Headers();
    myHeaders.set('Content-Type', 'application/json');
    myHeaders.set('Accept', 'text/plain');
    myHeaders.set('Authorization',token)
    console.log(myHeaders)

    return this.http.get('/pc/attendance/tickets',{headers:myHeaders})
    .map((response:Response) => response)
  }
}
