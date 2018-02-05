import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CodhabCommonProvider } from '../../../../providers/codhab-common/codhab-common';


@IonicPage()
@Component({
  selector: 'page-attendance-prev',
  templateUrl: 'attendance-prev.html',
})
export class AttendancePrevPage {
  cities: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private common: CodhabCommonProvider) {
    this.common.getGender()
    this.common.getSpecialCondition()
    this.common.getStates()
    this.common.getCities(7).subscribe((resp) => {
      this.cities = resp
      console.log(this.cities)
    })




  }


}
