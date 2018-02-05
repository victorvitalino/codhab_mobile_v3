import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators/map';
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

    return this.http.get('/pc/attendance/tickets',{headers:myHeaders})
    .map(this.extractData);

  }

  generateAttendances(token){
    let myHeaders = new Headers();
    console.log(token)
    myHeaders.set('Authorization', token)
    console.log(myHeaders)

    return this.http.post('/pc/attendance/tickets','',{ headers: myHeaders })
      // .map((resp) => {
      //   console.log(resp)
      // });
  }
  getAttendanceDetail(token,id){
    let myHeaders = new Headers();
    myHeaders.set('Content-Type', 'application/json');
    myHeaders.set('Accept', 'text/plain');
    myHeaders.set('Authorization', token)

    return this.http.get('/pc/attendance/tickets/'+id ,{ headers: myHeaders })
      .map(this.extractData);
  }
  
  getAttendanceMirror(token,id){
    let myHeaders = new Headers();
    myHeaders.set('Content-Type', 'application/json');
    myHeaders.set('Accept', 'text/plain');
    myHeaders.set('Authorization', token)

    return this.http.get('/pc/attendance/tickets/'+id+'/cadastres', { headers: myHeaders })
      .map(this.extractData);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body.data;
  }
}
