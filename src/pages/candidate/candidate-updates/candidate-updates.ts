import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-candidate-updates',
  templateUrl: 'candidate-updates.html',
})
export class CandidateUpdatesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToDetail(){
    this.navCtrl.push('CandidateUpdatesDetailPage')
  }
}
