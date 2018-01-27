import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';


@Injectable()
export class LoginServiceProvider {

  constructor(public http: HttpClient, private nativeStorage:NativeStorage, ) {
    console.log('Hello LoginServiceProvider Provider');
  }

  signUser(cpf,pass){
    return this.nativeStorage.setItem('Signed', { cpf: cpf , pass:pass, signed:true})
      .then( () => console.log('Sucesso'),
      error => console.error('Error storing item', error)
      );
      
  }
  getData(){
    return this.nativeStorage.getItem('Signed')
  }
  getCheckCandidate(params) {
    return this.http.get("/candidate/" + params + ".json?token=eed6a8780692be1675b1bd0f386ca8b0").map(res => res['data']);
  }
  getCandidate(cpf,pass){
    return this.http.get("/auth?id=" + cpf + "&pass=" + pass +"&token=eed6a8780692be1675b1bd0f386ca8b0").map(res => res['data']);
  }
  // getCheckCandidate(params) {
  //   return this.http.get("http://extranet.codhab.df.gov.br/candidato/cadastros/" + params + ".json?token=eed6a8780692be1675b1bd0f386ca8b0").map(res => res['data']);
  // }
  // getCandidate(cpf,pass){
  //   return this.http.get("http://extranet.codhab.df.gov.br/candidato/authenticate?id=" + cpf + "&pass=" + pass +"&token=eed6a8780692be1675b1bd0f386ca8b0").map(res => res['data']);
  // }

}
