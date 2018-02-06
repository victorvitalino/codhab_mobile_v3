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
    return this.httpclient.get('/pc/common/genders').map(resp => resp['data']);
  }
  getCivilState(){
    return this.httpclient.get('/pc/common/civil_states').map(resp => resp['data']);
  }
  getSpecialCondition(){
    return this.httpclient.get('/pc/common/special_condition_types').map(resp => resp['data']);
  }
  getStates(){
    return this.httpclient.get('/pc/common/states').map(resp => resp['data']);
  }

  getCities(state_id){
    return this.httpclient.get('/pc/common/states/' + state_id).map(resp => resp['data']['cities']['data']);
  }
  
}
