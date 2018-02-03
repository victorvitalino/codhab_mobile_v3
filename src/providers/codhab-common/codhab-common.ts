import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class CodhabCommonProvider {
  constructor(public httpclient: HttpClient) {

  }

  getGender() {
    return this.httpclient.get('/pc/common/genders').map(resp => resp);
  }
  getCivilState(){
    return this.httpclient.get('/pc/common/civil_states').subscribe((response) => {
      console.log(response['data'])
    })
  }
  getSpecialCondition(){
    return this.httpclient.get('/pc/common/special_condition_types').subscribe((response) => {
      console.log(response['data'])
    })
  }
  getStates(){
    return this.httpclient.get('/pc/common/states').subscribe((response) => {
      console.log(response['data'])
    })
  }

  getCities(state_id){
    return this.httpclient.get('/pc/common/states/' + state_id).map(resp => resp['data']['cities']['data']);
  }

}
