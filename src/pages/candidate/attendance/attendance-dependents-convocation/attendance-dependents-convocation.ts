import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from '../../../../providers/user-data/user-data';
import { AttendanceProvider } from '../../../../providers/attendance/attendance'

@IonicPage()
@Component({
  selector: 'page-attendance-dependents-convocation',
  templateUrl: 'attendance-dependents-convocation.html',
})
export class AttendanceDependentsConvocationPage {
  attendance_id: number;
  user_token:string;
  user_name: string = '';
  dependents: number[] = [];
  mirror_id: number;
  dependents_new: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
          private userService: UserDataProvider, 
          private attendanceService: AttendanceProvider) {
  }

  ionViewDidLoad() {
    
    this.userService.getData().then((resp) => {
      this.attendance_id = this.navParams.get('id')
      this.user_name = resp.name;
      this.user_token = resp.auth;
      console.log(this.attendance_id, this.user_token, this.user_name)
      this.attendanceService.getDependents(this.user_token, this.attendance_id).subscribe((resp) => {
        if (resp.length > 0){
          this.dependents_new = false
        }
      })
    });
  }


  addDependent(id){
    this.navCtrl.push('AttendanceDependentsConvocationNewPage',{id})
  }
  removeDependent(){}
  editDependent(){}

}
