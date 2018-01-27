import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams  } from 'ionic-angular';
import { MyApp } from '../../app/app.component'
import { LoginServiceProvider } from '../../providers/login-service/login-service';
 
@IonicPage()
@Component({
  selector: 'page-navigation',
  templateUrl: 'navigation.html'
})
export class NavigationPage {

  public user_signed :boolean = true;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public myApp: MyApp, 
    public service:LoginServiceProvider) {
  }

  ngOnInit() {
    this.service.getData().then((resp) => {
        if(resp.signed == true){
          this.user_signed = true
        }else{
          this.user_signed = false
        }
      }).catch((error) => {
          this.user_signed = false
        })
  }
  
  goToSchedule() {
    this.navCtrl.push('WelcomePage')
  }

  goToQrCode() {
    this.navCtrl.push('QrcodePage')
  }

  goToSearch() {
    this.navCtrl.push('HabitationSearchPage')
  }
  goToChat() {
    this.navCtrl.push('CandidateChatPage')
  }
  
}
