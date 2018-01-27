import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginServiceProvider } from '../../../providers/login-service/login-service';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class WelcomeChatPage {

  private cpf_cnpj: string;
  private pass: string;
  public signed: boolean = false;

  constructor(public navCtrl: NavController, 
    public loginService: LoginServiceProvider,
    public toastCtrl:ToastController,
    public navParams: NavParams) {
    this.cpf_cnpj = this.navParams.get('cpf_cnpj')

  }

  goToHome() {
    this.navCtrl.setRoot('NavigationPage');
  }

  sign(pass){
    this.cpf_cnpj = this.navParams.get('data')
    this.loginService.getCandidate(this.cpf_cnpj,pass)
    .subscribe((response) => {
      if (response == 'Senha ou usuário inválido.'){
        this.presentToast(response)
        console.log(response)
      }else{
        this.loginService.signUser(this.cpf_cnpj,pass)
        window.location.reload();
        // this.navCtrl.setRoot('NavigationPage')
      }
    })
  }

  goToPass() {
    this.navCtrl.push('WelcomePassPage')
  }
  
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 6000,
      position:'middle'
    });
    toast.onDidDismiss(() => {
      console.log('Mensagem Fechada');
    });

    toast.present();
  }
}

