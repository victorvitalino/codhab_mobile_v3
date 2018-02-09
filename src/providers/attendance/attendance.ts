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
    myHeaders.set('Authorization', token)
    return this.http.post('/pc/attendance/tickets','',{ headers: myHeaders })
  }
  getAttendanceDetail(token,id){
    let myHeaders = new Headers();
    myHeaders.set('Content-Type', 'application/json');
    myHeaders.set('Accept', 'text/plain');
    myHeaders.set('Authorization', token)

    return this.http.get('/pc/attendance/tickets/'+id ,{ headers: myHeaders })
      .map(this.extractData);
  }
  
  getAttendanceMirror(token,ticket_id){
    let myHeaders = new Headers();
    myHeaders.set('Content-Type', 'application/json');
    myHeaders.set('Accept', 'text/plain');
    myHeaders.set('Authorization', token)
    
    return this.http.get('/pc/attendance/tickets/'+ticket_id+'/cadastres', { headers: myHeaders })
      .map(this.extractData);
  }

  updateCadastre(token, ticket_id, mirror_id, obj){
    let myHeaders = new Headers();
    myHeaders.set('Content-Type', 'application/json');
    myHeaders.set('Accept', 'text/plain');
    myHeaders.set('Authorization', token)

    return this.http.put('/pc/attendance/tickets/'+ ticket_id +'/cadastres/'+ mirror_id, obj, { headers: myHeaders })
  }
  getDependents(token,ticket_id){
    let myHeaders = new Headers();
    myHeaders.set('Content-Type', 'application/json');
    myHeaders.set('Accept', 'text/plain');
    myHeaders.set('Authorization', token)

    return this.http.get('/pc/attendance/tickets/' + ticket_id + '/dependents', { headers: myHeaders })
    .map(this.extractData)
  }

  createDependent(token,ticket_id,obj){
    let myHeaders = new Headers();
    myHeaders.set('Content-Type', 'application/json');
    myHeaders.set('Accept', 'text/plain');
    myHeaders.set('Authorization', token)

    return this.http.post('/pc/attendance/tickets/' + ticket_id + '/dependents', obj ,{ headers: myHeaders })
      .map(this.extractData)
  }
  updateDependent(token,ticket_id,dependent_id,obj){
    let myHeaders = new Headers();
    myHeaders.set('Content-Type', 'application/json');
    myHeaders.set('Accept', 'text/plain');
    myHeaders.set('Authorization', token)

    return this.http.put('/pc/attendance/tickets/' + ticket_id + '/dependents/'+dependent_id, obj ,{ headers: myHeaders })
      .map(this.extractData)
  }
  getDependentDetail(token,ticket_id,dependent_id){
    let myHeaders = new Headers();
    myHeaders.set('Content-Type', 'application/json');
    myHeaders.set('Accept', 'text/plain');
    myHeaders.set('Authorization', token)
    return this.http.get('/pc/attendance/tickets/' + ticket_id + '/dependents/'+dependent_id, { headers: myHeaders })
      .map(this.extractData)
  }
  removeDependent(token,dependent_id,ticket_id){
    let myHeaders = new Headers();
    myHeaders.set('Content-Type', 'application/json');
    myHeaders.set('Accept', 'text/plain');
    myHeaders.set('Authorization', token)

    return this.http.delete('/pc/attendance/tickets/'+ticket_id+'/dependents/'+dependent_id, { headers: myHeaders })
    .map(this.extractData)
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data;
  }
}
