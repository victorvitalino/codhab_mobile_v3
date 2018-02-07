import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CodhabCommonProvider } from '../../../../../providers/codhab-common/codhab-common';
import { UserDataProvider } from '../../../../../providers/user-data/user-data';
import { AttendanceProvider } from '../../../../../providers/attendance/attendance';
@IonicPage()
@Component({
  selector: 'page-attendance-dependents-convocation-new',
  templateUrl: 'attendance-dependents-convocation-new.html',
})
export class AttendanceDependentsConvocationNewPage {

  cpf: string = '';
  DECIMAL_SEPARATOR = ".";
  GROUP_SEPARATOR = ",";
  pureResult: any;
  candidate: object;
  maskedId: any;
  val: any;
  v: any;
  gender: any;
  states: any;
  special: any;
  kinship: any;
  employ: any;
  civilStates: any;
  specialCheck: boolean = false;
  attendance_id: number;
  user_token: string;
  user_name: string = '';
  mirror_id: number;

  @ViewChild('attendanceSlider') attendanceSlider: any;

  slideOneForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public common:CodhabCommonProvider,
    public userService:UserDataProvider,
    public attendanceService:AttendanceProvider,
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
      income:'',
      kinship_id:'',
      place_birth:'',
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

  }

  ionViewDidLoad() {
    this.userService.getData().then((resp) => {
      this.attendance_id = this.navParams.get('id')
      this.user_name = resp.name;
      this.user_token = resp.auth;
    });
  }
  next() {
    this.attendanceSlider.slideNext();
  }

  prev() {
    this.attendanceSlider.slidePrev();
  }

  save() {
    this.slideOneForm.value['cpf'] = this.unFormat(this.slideOneForm.value['cpf'])
    console.log(this.slideOneForm.value);
    this.attendanceService.createDependent(this.user_token, this.attendance_id, this.slideOneForm.value)
      .subscribe((resp) => {
        console.log(resp)
      })

  }


  format(valString) {
    if (!valString) {
      return '';
    }
    let val = valString.toString();
    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
    this.pureResult = parts;
    if (parts[0].length <= 11) {
      this.maskedId = this.cpf_mask(parts[0]);
      return this.maskedId;
    }
  }

  unFormat(val) {
    if (!val) {
      return '';
    }
    val = val.replace(/\D/g, '');

    if (this.GROUP_SEPARATOR === ',') {
      return val.replace(/,/g, '');
    } else {
      return val.replace(/\./g, '');
    }
  }

  cpf_mask(v) {
    v = v.replace(/\D/g, ''); //Remove all that is not digits
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Insert a dot between the third and quarter digit
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Insert a dot between the third and quarter digit again
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Insert an dash between the third and quarter digit
    return v;
  }
  getGender() {
    this.common.getGender().subscribe((resp) => {
      this.gender = resp
    })
  }
  getStates() {
    this.common.getStates().subscribe((resp) => {
      this.states = resp
      console.log(this.states)
    })
  }
  getCivilStates() {
    this.common.getCivilState().subscribe((resp) => {
      this.civilStates = resp
      console.log(this.civilStates)
    })
  }
  getSpecials() {
    this.common.getSpecialCondition().subscribe((resp) => {
      this.special = resp
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
}