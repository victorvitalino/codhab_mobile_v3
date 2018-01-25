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

  private typewriter_text: string = "<br><h1 class='text-center'><b>Olá! Seja bem vindo(a) ao App da CODHAB. :) </h1></b><br>" +
  "<h4><p>Sou seu assistente virtual e te ajudarei a achar o que você precisa.</p>" +
  "<p>Digite sua senha para acessar a área do condidato e clique em Prosseguir</b>.</p></h4>"

  private typewriter_display: string = "";

  private enable_next_button : boolean = false;

  private cpf_cnpj: string;

  private pass: string;

  public signed: boolean = false;

  constructor(public navCtrl: NavController, 
    public loginService: LoginServiceProvider,
    public toastCtrl:ToastController,
    public navParams: NavParams) {
    this.cpf_cnpj = this.navParams.get('cpf_cnpj')

  }

  ngOnInit() {
    this.typingCallback(this);
  }

  typingCallback(that) {
    let total_length = that.typewriter_text.length;
    let current_length = that.typewriter_display.length;
    if (current_length < total_length) {
      that.typewriter_display += that.typewriter_text[current_length];
      setTimeout(that.typingCallback, 1, that);
    } else {
      that.enable_next_button = true;
    }
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
        this.navCtrl.setRoot('NavigationPage')
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

