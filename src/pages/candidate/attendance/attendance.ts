import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CodhabCommonProvider } from '../../../providers/codhab-common/codhab-common';


@IonicPage()
@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html',
})
export class AttendancePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private common:CodhabCommonProvider) {
  }

  ionViewDidLoad() {
    this.common.getGender()
    this.common.getSpecialCondition()
    this.common.getStates()
    this.common.getCities(7)
  }

}
