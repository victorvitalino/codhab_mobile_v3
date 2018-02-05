import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from '../../../../providers/user-data/user-data';
import { AttendanceProvider } from '../../../../providers/attendance/attendance';

@IonicPage()
@Component({
  selector: 'page-attendance-detail',
  templateUrl: 'attendance-detail.html',
})
export class AttendanceDetailPage {
  attendance_id: number;
  user_name: string = '';
  user_token: string = '';
  user_context: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userService: UserDataProvider,
    private attendanceService: AttendanceProvider){
  }

  ngOnInit() {
    this.attendance_id = this.navParams.get('id')
    this.userService.getData().then((resp) => {
    this.user_name = resp.name
    this.user_token = resp.auth
    this.attendanceService.getAttendanceDetail(this.user_token,this.attendance_id).subscribe((resp)=>{
      this.user_context = resp.context_id
    })
  });
  }

  goToUpdateCadastre(context,id){
    if(context == 2){
      this.navCtrl.push('AttendanceCadastreConvocationPage',{id})
    }else{
      this.navCtrl.push('AttendanceCadastrePage',{id})
    }
  }

}
