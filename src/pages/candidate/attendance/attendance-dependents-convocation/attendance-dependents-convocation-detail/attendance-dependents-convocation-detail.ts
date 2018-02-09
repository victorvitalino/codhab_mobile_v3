import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CodhabCommonProvider } from '../../../../../providers/codhab-common/codhab-common';
import { UserDataProvider } from '../../../../../providers/user-data/user-data';
import { AttendanceProvider } from '../../../../../providers/attendance/attendance';


@IonicPage()
@Component({
  selector: 'page-attendance-dependents-convocation-detail',
  templateUrl: 'attendance-dependents-convocation-detail.html',
})
export class AttendanceDependentsConvocationDetailPage {
  cpf: string = '';
  DECIMAL_SEPARATOR = ".";
  GROUP_SEPARATOR = ",";
  pureResult: any;
  dependent: object;
  dependent_id: number;
  maskedId: any;
  val: any;
  v: any;
  gender: any;
  states: any;
  special: any;
  kinships: any;
  employ: any;
  civilStates: any;
  specialCheck: boolean = true;
  attendance_id: number;
  user_token: string;
  user_name: string = '';
  mirror_id: number;

  @ViewChild('attendanceSlider') attendanceSlider: any;

  slideOneForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public common: CodhabCommonProvider,
    public userService: UserDataProvider,
    public load: LoadingController,
    public alertCtrl:AlertController,
    public attendanceService: AttendanceProvider,
    public formBuilder: FormBuilder) {

    this.slideOneForm = formBuilder.group({
      name: '',
      cpf: '',
      gender_id: '',
      born: '',
      nationality: '',
      civil_state_id: '',
      rg: '',
      rg_uf_id: '',
      rg_org: '',
      income: '',
      kinship_id: '',
      place_birth: '',
      employment: '',
      cid: '',
      nis: '',
      special_condition: '',
      special_condition_type_id: '',
      adapted_property: ''

    });
    this.getGender()
    this.getStates()
    this.getSpecials()
    this.getCivilStates()
    this.getKinship()
    this.userService.getData().then((resp) => {
      this.user_name = resp.name;
      this.user_token = resp.auth;
      this.dependent_id = this.navParams.get('dependent')
      this.attendance_id = this.navParams.get('attendance')
      this.attendanceService.getDependentDetail(this.user_token, this.attendance_id, this.dependent_id)
        .subscribe((resp) => {
          this.dependent = Array.of(resp)
          console.log(this.dependent)
        })
    });
  }

  ionViewDidLoad() {

  }
  next() {
    this.attendanceSlider.slideNext();
  }

  prev() {
    this.attendanceSlider.slidePrev();
  }

  getGender() {
    this.common.getGender().subscribe((resp) => {
      this.gender = resp
    })
  }
  getStates() {
    this.common.getStates().subscribe((resp) => {
      this.states = resp
    })
  }
  getCivilStates() {
    this.common.getCivilState().subscribe((resp) => {
      this.civilStates = resp
    })
  }
  getSpecials() {
    this.common.getSpecialCondition().subscribe((resp) => {
      this.special = resp
    })
  }
  getKinship() {
    this.common.getKinship().subscribe((resp) => {
      this.kinships = resp
    })
  }

  specialConditionCheck(check) {
    console.log(check)
    if (check === "true") {
      this.specialCheck = true
    } else {
      this.specialCheck = false
    }
  }
  employmentCheck(check) {
    console.log(check)
    if (check === "true") {
      this.employ = true
    } else {
      this.employ = false
    }
  }
  editDependent(dependent_id) {
    this.navCtrl.push('AttendanceDependentsConvocationEditPage', { attendance: this.attendance_id, dependent: dependent_id })
  }
  presentAlert(dependent_id) {
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: 'Você está <b>removendo</b> um de seus dependentes, tem certeza disso?',
      buttons: [
        {
          text: 'Agora Não',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Claro',
          handler: () => {
            this.removeDependent(dependent_id);
          }
        }
      ]
    });
    alert.present();
  }
  removeDependent(dependent_id) {
    this.attendanceService.removeDependent(this.user_token, dependent_id, this.attendance_id).subscribe((resp) => {
      if (resp.deleted === true) {
        this.navCtrl.pop()
      }
    })
  }

}
