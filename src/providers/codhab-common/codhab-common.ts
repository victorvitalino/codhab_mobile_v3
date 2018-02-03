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
    this.httpclient.get('/pc/common/genders').subscribe((response) => {
      console.log(response['data'])
    })
  }
  getCivilState(){
    this.httpclient.get('/pc/common/civil_states').subscribe((response) => {
      console.log(response['data'])
    })
  }
  getSpecialCondition(){
    this.httpclient.get('/pc/common/special_condition_types').subscribe((response) => {
      console.log(response['data'])
    })
  }
  getStates(){
    this.httpclient.get('/pc/common/states').subscribe((response) => {
      console.log(response['data'])
    })
  }

  getCities(state_id){
      this.httpclient.get('/pc/common/states/'+state_id).subscribe((response) => {
        console.log(response['data']['cities']['data'])
      })
  }

}
