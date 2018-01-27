import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TextServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello TextServiceProvider Provider');
  }

}
