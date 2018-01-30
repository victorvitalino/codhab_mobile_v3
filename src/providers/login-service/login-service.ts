import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


@Injectable()
export class LoginServiceProvider {

  constructor(public http: HttpClient, private storage:Storage ) {
    console.log('Hello LoginServiceProvider Provider');
  }

  signUser(cpf,auth,name){
    return this.storage.set('Signed', { cpf: cpf , auth:auth, signed:true, name:name })
      .then( () => console.log('Sucesso'),
      error => console.error('Error storing item', error)
      );
  }

  signEntity(cnpj,auth){
    return this.storage.set('Signed',{cnpj:cnpj, auth:auth, signed:true})
    .then (() => console.log('Entidade Sucesso'),
    error => console.error('Erro', error)
    );
  }

  loginUser(cpf,pass) {
    return this.http.post("/pc/candidate/sessions",{
      cpf: cpf,
      password:pass
    }).map(res => res);

  }

  loginEntity(cnpj,pass){
    return this.http.post("/pc/entity/sessions",{
      cnpj: cnpj,
      pass:pass
    }).map(res => res)
  }

  getData(){
    return this.storage.get('Signed')
  }
  getCheckCandidate(params) {
    return this.http.get("/pc/candidate/cadastres/" + params).map(res => res['data']);
  }
  getCheckEntity(params) {
    return this.http.get("/pc/entity/cooperatives/" + params).map(res => res['data']);
  }

}
