import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserDataProvider } from '../../../../providers/user-data/user-data';
import { AttendanceProvider } from '../../../../providers/attendance/attendance';
@IonicPage()
@Component({
  selector: 'page-attendance-income',
  templateUrl: 'attendance-income.html',
})
export class AttendanceIncomePage {
  attendance_id: number;
  user_name: string = '';
  user_token: string = '';
  user_context: number;
  attendances: number[] = [];
  dependents: number[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private userService:UserDataProvider,
              public loadingCtrl:LoadingController,
              private attendanceService:AttendanceProvider) {
  }

  ngOnInit() {
    this.attendance_id = this.navParams.get('id')
    this.userService.getData().then((resp) => {
      this.user_name = resp.name
      this.user_token = resp.auth
      this.getDependents(this.attendance_id)
  
    });
  
  }

  getDependents(id) {
    let loader = this.loadingCtrl.create({
      content: "Carregando Dados",
      spinner: 'crescent'
    });

    loader.present();
    this.attendanceService.getIncomes(this.user_token,this.attendance_id).subscribe((resp)=>{
      console.log(resp)
    })
    this.attendanceService.getDependents(this.user_token,id)
      .subscribe((resp) => {
        this.dependents = resp
      })
    loader.dismiss();
  }
}
