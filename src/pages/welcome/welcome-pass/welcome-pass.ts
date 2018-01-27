import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-welcome-pass',
  templateUrl: 'welcome-pass.html',
})
export class WelcomePassPage {
  private cpf_cnpj: string;
  private pass: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  check_pass(pass){
    if (!pass) {
      return '';
    }
    if(pass.length == 6){
      return true
    }
    console.log(pass.length)
    console.log(pass)
  }
  new_pass(pass,check_pass){
    if (pass == check_pass) {
      this.navCtrl.setRoot('NavigationPage')
    } else {
      console.log("Senhas não iguais")
    }
  }
  goToWelcome(){
    this.navCtrl.push('WelcomePage')
  }

}
