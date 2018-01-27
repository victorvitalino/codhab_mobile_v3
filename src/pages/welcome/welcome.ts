import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LoginServiceProvider } from '../../providers/login-service/login-service';



@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})

export class WelcomePage {

  cpf_cnpj: string = '';
  DECIMAL_SEPARATOR=".";
  GROUP_SEPARATOR=",";
  pureResult: any;
  candidate: object;
  maskedId: any;
  val: any;
  v: any;
  teste:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    public loginService: LoginServiceProvider,
    public load: LoadingController
    ) {

  }

  format(valString) {
    if (!valString) {
      return '';
    }
    let val = valString.toString();
    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
    this.pureResult = parts;
    if (parts[0].length <= 11) {
      this.maskedId = this.cpf_mask(parts[0]);
      return this.maskedId;
    } else {
      this.maskedId = this.cnpj(parts[0]);
      return this.maskedId;
    }
  }

  unFormat(val) {
    if (!val) {
      return '';
    }
    val = val.replace(/\D/g, '');

    if (this.GROUP_SEPARATOR === ',') {
      return val.replace(/,/g, '');
    } else {
      return val.replace(/\./g, '');
    }
  }

  cpf_mask(v) {
    v = v.replace(/\D/g, ''); //Remove all that is not digits
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Insert a dot between the third and quarter digit
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Insert a dot between the third and quarter digit again
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Insert an dash between the third and quarter digit
    return v;
  }

  cnpj(v) {
    v = v.replace(/\D/g, ''); //Remove all that is not digits
    v = v.replace(/^(\d{2})(\d)/, '$1.$2'); //Insert a dot between the second and third digits
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); //Insert a dot between the fifth and sixth digits
    v = v.replace(/\.(\d{3})(\d)/, '.$1/$2'); //Insert a slash between the eighth and ninth digits
    v = v.replace(/(\d{4})(\d)/, '$1-$2'); //Insert an dash after the quarter digit
    return v;
  }


//Navegação


  startChat(cpf_cnpj) {
    let loader = this.load.create({
      content: "Pesquisando..."
    });
    loader.present();
    this.cpf_cnpj = this.unFormat(cpf_cnpj)
    if(this.cpf_cnpj.length > 11){
      this.loginService.getCheckEntity(this.cpf_cnpj)
        .subscribe((response) => {
          if (response == 'cnpj não encontrado.') {
            loader.dismiss();
            this.navCtrl.push('WelcomeNoUserPage')
          } else {
            loader.dismiss();
            console.log(response)
            this.navCtrl.push('WelcomeChatPage', { data: this.cpf_cnpj, name: response.fantasy_name });
          }
        });
    }else{
      this.loginService.getCheckCandidate(this.cpf_cnpj)
      .subscribe((response) =>{
        if (response == 'cpf não encontrado.'){
          loader.dismiss();
          this.navCtrl.push('WelcomeNoUserPage')
        }else{
          loader.dismiss();
          this.navCtrl.push('WelcomeChatPage', { data : this.cpf_cnpj, name : response.name });
        }
      });
    }
  }

  goToHome() {
    this.navCtrl.setRoot('NavigationPage');
  }
}
