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
  user:boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public myApp: MyApp, 
    public service:LoginServiceProvider) {
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    // this.insert_data('01801850127',this.latitude,this.longitude);
     this.service.getData().then((resp) => {
       console.log(resp)
     })
  }
  
  // insert_data(cpf,latitude,longitude){
  //   console.log('verificando insert: '+ latitude + ' ' + longitude)
  //   this.service.insertData(cpf,latitude,longitude)
  // }
  
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
