import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from '../../../../providers/user-data/user-data';
import { AttendanceProvider } from '../../../../providers/attendance/attendance';
import { CodhabCommonProvider } from '../../../../providers/codhab-common/codhab-common';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'page-attendance-cadastre-convocation',
  templateUrl: 'attendance-cadastre-convocation.html',
})
export class AttendanceCadastreConvocationPage {
  user_token: string = '';
  attendance_id: number;
  cadastre: any;
  rForm: FormGroup;
  gender: any;
  states: any;
  special: any;
  civilStates: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private userService: UserDataProvider, 
    private common:CodhabCommonProvider,
    private attendanceService:AttendanceProvider) {
      this.getGender()
      this.getStates()
      this.getSpecials()
      this.getCivilStates()
  }

  ionViewDidLoad() {
    
    this.userService.getData().then((resp) => {
      this.attendance_id = this.navParams.get('id')
      this.user_token = resp.auth
      this.attendanceService.getAttendanceMirror(this.user_token, this.attendance_id).subscribe((resp) => {
        this.cadastre = Array.of(resp)
        console.log(this.cadastre)
        console.log(this.gender)
      })
    });
    
  }
  getGender(){
    this.common.getGender().subscribe((resp) => {
      this.gender = resp
    })
  }
  getStates(){
    this.common.getStates().subscribe((resp) => {
      this.states = resp
    })
  }
  getCivilStates(){
    this.common.getCivilState().subscribe((resp) => {
      this.civilStates = resp
      console.log(this.civilStates)
    })
  }
  getSpecials(){
    this.common.getSpecialCondition().subscribe((resp) => {
      this.special = resp
    })
  }
}
