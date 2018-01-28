import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SchedulesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SchedulesProvider Provider');
  }


  getSchedules(){
    return this.http.get("/pc/schedule/agendas/").map(res => res['data']).subscribe((resp)=>{
      console.log(resp)
    })
  }
}
