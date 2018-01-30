import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


@Injectable()
export class UserDataProvider {

  constructor(public http: HttpClient, private storage:Storage) {
    console.log('Hello UserDataProvider Provider');
  }
  getData() {
    return this.storage.get('Signed')
  }
}
