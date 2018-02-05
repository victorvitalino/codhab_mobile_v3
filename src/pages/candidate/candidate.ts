import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-candidate',
  templateUrl: 'candidate.html',
})
export class CandidatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToProfile(){
    this.navCtrl.push('CandidateProfilePage')
  }
  goToNotification(){
    this.navCtrl.push('CandidateNotificationsPage')
  }
  goToUpdates(){
    this.navCtrl.push('CandidateUpdatesPage')
  }
  goToChat(){
    this.navCtrl.push('CandidateChatPage')
  }
  goToRequirements(){
    this.navCtrl.push('CandidateRequirementsPage')
  }
  goToSchedules(){
    this.navCtrl.push('CandidateSchedulesPage')
  }
  goToIndications(){
    this.navCtrl.push('CandidateProfileIndicationPage')
  }
  goToWallet(){
    this.navCtrl.push('CandidateProfileIncomePage')
  }
  goToAttendancePrev(){
    this.navCtrl.push('AttendancePrevPage')
  }
  goToAttendance(){
    this.navCtrl.push('AttendancePage')
  }

}
