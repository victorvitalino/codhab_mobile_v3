import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { UserDataProvider } from '../user-data/user-data';
@Injectable()
export class SchedulesProvider {

  constructor(public http: Http) {
    console.log('Hello SchedulesProvider Provider');
  }


  getSchedules(){
    return this.http.get("/pc/schedule/agendas/").subscribe((resp) => {
      console.log(resp)
    })
  }
}
