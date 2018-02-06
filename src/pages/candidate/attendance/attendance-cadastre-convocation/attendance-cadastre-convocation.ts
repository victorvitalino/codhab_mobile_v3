import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from '../../../../providers/user-data/user-data';
import { AttendanceProvider } from '../../../../providers/attendance/attendance';
import { CodhabCommonProvider } from '../../../../providers/codhab-common/codhab-common';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { DateTime } from 'ionic-angular/components/datetime/datetime';
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
  bornCities: any;
  workCities: any;
  weddingCheck: boolean = false;
  specialCheck: boolean = false;
  employ: boolean = false;
  startDateBorn: string;
  startDateWedding: string;
  startDateArrival: string;
  startDateAddmission: string;

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
  
        if(this.cadastre[0]['born'] == undefined){
          this.startDateBorn = new Date('01/01/2018').toISOString();
        }else{
          this.startDateBorn = new Date(this.cadastre[0]['born']).toISOString();
        }
        if(this.cadastre[0]['wedding_date'] == undefined){
          this.startDateWedding = new Date('01/01/2018').toISOString();
        }else{
          this.startDateWedding = new Date(this.cadastre[0]['wedding_date']).toISOString();
        }
        if (this.cadastre[0]['arrival_df'] == undefined){
          this.startDateArrival = new Date('01/01/2018').toISOString();
        }else{
          this.startDateArrival = new Date(this.cadastre[0]['arrival_df']).toISOString();
        }
        if (this.cadastre[0]['addmission_date'] == undefined){
          this.startDateAddmission = new Date('01/01/2018').toISOString();
        }else{
          this.startDateAddmission = new Date(this.cadastre[0]['addmission_date']).toISOString();
        }
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
      console.log(this.states)
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
  bornCity(id){
    this.common.getCities(id).subscribe((resp)=>{
      this.bornCities= resp
    })
  }
  workCity(id){
    this.common.getCities(id).subscribe((resp)=>{
      this.workCities= resp
    })
  }

  civilCheck(civil_id) {
    if (civil_id == 2){
      this.weddingCheck = true
    }else{
      this.weddingCheck = false
    }
  }
  specialConditionCheck(check){
    console.log(check)
    if(check === "true"){
      this.specialCheck= true
    }else{
      this.specialCheck = false
    }
  }
  employmentCheck(check){
    console.log(check)
    if(check === "true"){
      this.employ = true
    }else{
      this.employ = false
    }
  }
}
