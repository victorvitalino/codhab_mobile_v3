import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class HabitationProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HabitationProvider Provider');
  }


  // Testar dispositivo
  // getCandidate(params){
  //   return this.http.get("http://extranet.codhab.df.gov.br/candidato/cadastros/"+params+".json?token=eed6a8780692be1675b1bd0f386ca8b0")
  // }

  // Testar Web
  getCandidate(params){
    return this.http.get("/candidate/"+params+".json?token=eed6a8780692be1675b1bd0f386ca8b0").map((response:Response) => response)
  }
}
