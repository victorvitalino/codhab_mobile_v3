import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class AttendanceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AttendanceProvider Provider');
  }

  getAttendances(){
    return this.http.get('/pc/attendance/tickets').map((response:Response) => response)
  }
}
