import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators/map';
import { Observable } from "rxjs/Observable";

@Injectable()
export class TextServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello TextServiceProvider Provider');
  }
  
  get_text(){
    const msgListUrl = './assets/mock/text-list.json';
    return this.http.get(msgListUrl)

  }
}
