import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from '../../../providers/user-data/user-data';
import { AttendanceProvider } from '../../../providers/attendance/attendance';
@IonicPage()
@Component({
  selector: 'page-attendance-prev',
  templateUrl: 'attendance-prev.html',
})
export class AttendancePrevPage {
  user_name: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userService: UserDataProvider,
    private attendanceService: AttendanceProvider) {
  }


  ngOnInit() {
    this.userService.getData().then((resp)=>{
      this.user_name = resp.name
    });
    this.attendanceService.getAttendances().subscribe((resp)=>{
      
    })
  }

  goToAttendanceBasic(){
    this.navCtrl.push("AttendanceBasicPage")
  }

  goToAttendance(){
    this.navCtrl.push("AttendanceBasicPage")

  }
}
