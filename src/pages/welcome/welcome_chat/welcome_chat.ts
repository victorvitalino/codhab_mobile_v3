import { NgModule } from '@angular/core';
import { IonicPageModule, Events } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginServiceProvider } from '../../../providers/login-service/login-service';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class WelcomeChatPage {

  private cpf_cnpj:     string;
  private name:         string;
  private pass:         string;
  public  signed:       boolean = false;

  constructor(public navCtrl: NavController, 
    public loginService: LoginServiceProvider,
    public toastCtrl:ToastController,
    public events:Events,
    public navParams: NavParams) {
    this.cpf_cnpj = this.navParams.get('cpf_cnpj')
  }

  ngOnInit() {
    this.cpf_cnpj = this.navParams.get('data')
    this.name = this.navParams.get('name')
  }

  goToHome() {
    this.navCtrl.setRoot('NavigationPage');
  }

  sign(pass){
    this.cpf_cnpj = this.navParams.get('data')
    if(this.cpf_cnpj.length <= 11){
      this.loginService.loginUser(this.cpf_cnpj,pass)
      .subscribe((response) => {
        let status = response['status']
        if (status == 401){
          this.presentToast(response['data']['errors']['code'])
        }else{
          this.createUser(this.name)
          this.loginService.signUser(this.cpf_cnpj,response['data']['auth_token'],this.name)
          this.navCtrl.setRoot('NavigationPage')
        }
      })
    }else{
      this.loginService.loginEntity(this.cpf_cnpj, pass)
        .subscribe((response) => {
          console.log(response)
          let status = response['status']
          if (status == 401) {
            this.presentToast(response['data']['errors']['code'])
          } else {
            this.loginService.signUser(this.cpf_cnpj, response['data']['auth_token'],this.name)
            window.location.reload();
          }
        })
    }
  }
  createUser(user) {
    console.log('User created!')
    this.events.publish('user:created', user, Date.now());
  }
  goToPass() {
    this.navCtrl.push('WelcomePassPage')
  }
  
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position:'middle'
    });
    toast.onDidDismiss(() => {
      console.log('Mensagem Fechada');
    });

    toast.present();
  }
}

