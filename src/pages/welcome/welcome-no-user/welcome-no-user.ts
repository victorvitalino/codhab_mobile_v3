import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-welcome-no-user',
  templateUrl: 'welcome-no-user.html',
})

export class WelcomeNoUserPage {

  private cpf_cnpj: string;

  private pass: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

    goToNavigation(){
      this.navCtrl.setRoot('NavigationPage')
    }
}
