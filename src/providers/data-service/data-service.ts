import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';


@Injectable()
export class DataServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DataServiceProvider Provider');
  }

  /* Aqui estou passando /api como paramentro pois foi necessário criar um proxy para
  sanar o problema de CORS quando utilizado em localhost. Proxy se encontra no arquivo ionic.config.json
  */ 
  getNews(){
    return this.http.get("http://www.codhab.df.gov.br/noticias_mobile.json").map((response: Response) => response[0])
  }

  getNewSingle(id){
    return this.http.get('http://www.codhab.df.gov.br/postagem/' + id + ".json").map((response:Response) => response)
  }
  getStations(){
    return this.http.get('http://www.codhab.df.gov.br/assistencia.json').map((response: Response) => response)
  }
  getStation(id) {
    return this.http.get("http://www.codhab.df.gov.br/assistencia/" + id + ".json").map((response: Response) => response)
  }
  // Para teste no pc
  // getNews(){
  //   return this.http.get("/noticias_mobile").map((response: Response) => response[0])
  // }

  // getNewSingle(id){
  //   return this.http.get('/postagem/' + id + ".json").map((response:Response) => response)
  // }
  // getStations() {
  //   return this.http.get('/stations/').map((response: Response) => response)
  // }
  // getStation(id) {
  //   return this.http.get("/station/" + id + ".json").map((response: Response) => response)
  // }
}
