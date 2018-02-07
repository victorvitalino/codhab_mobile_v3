import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from '../../../providers/user-data/user-data';
import { AttendanceProvider } from '../../../providers/attendance/attendance';
@IonicPage()
@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html',
})
export class AttendancePage {
  user_name:  string = '';
  user_token: string = '';
  attendances: number[] = [];
  attendance_new: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userService: UserDataProvider,
    private attendanceService: AttendanceProvider) {
  }


  ionViewCanEnter() {
    this.userService.getData().then((resp) => {
      this.user_name = resp.name
      this.user_token = resp.auth
      this.attendanceCheck();
    });
  }

  attendanceGenererate(){
    this.attendanceService.generateAttendances(this.user_token).subscribe((resp) => {
      console.log(resp)
    })
  }
  attendanceCheck(){
    this.attendanceService.getAttendances(this.user_token).subscribe((resp) => {
      this.attendances = resp
      console.log(this.attendances)
      this.attendances.forEach(element => {
        if (element['current_situation_name'] === "Em atualização"){
          this.attendance_new = false;
        }
      });
    })
  }



  goToAttendanceBasic() {
    this.navCtrl.push("AttendanceBasicPage")
  }

  goToAttendance() {
    this.attendanceGenererate()
  }
  goToDetail(id){
    this.navCtrl.push("AttendanceDetailPage",{id})
  }
}
