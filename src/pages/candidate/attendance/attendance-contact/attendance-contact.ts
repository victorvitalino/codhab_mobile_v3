import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UserDataProvider } from '../../../../providers/user-data/user-data';
import { AttendanceProvider } from '../../../../providers/attendance/attendance';
import { CodhabCommonProvider } from '../../../../providers/codhab-common/codhab-common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgControl, AbstractControl, Validators } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'page-attendance-contact',
  templateUrl: 'attendance-contact.html',
})
export class AttendanceContactPage {
  cadastre: any;
  attendance_id: number;
  user_token: string = '';
  user_name: string = '';
  phone_formater: string = '';
  DECIMAL_SEPARATOR = ".";
  GROUP_SEPARATOR = ",";
  pureResult: any;
  candidate: object;
  maskedId: any;
  val: any;
  v: any;
  
  @ViewChild('attendanceSlider') attendanceSlider: any;

  slideOneForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public load: LoadingController,
    private userService: UserDataProvider,
    private common: CodhabCommonProvider,
    public formBuilder: FormBuilder,
    private attendanceService: AttendanceProvider
  ) {

    this.slideOneForm = formBuilder.group({
      email: '',
      telephone:'',
      telephone_optional:'',
      cell_phone:''
    });
  }

  ionViewDidLoad() {
    this.userService.getData().then((resp) => {
      this.attendance_id = this.navParams.get('id')
      this.user_token = resp.auth
      this.user_name = resp.name
      this.attendanceService.getContacts(this.user_token,this.attendance_id).subscribe((response) =>{
        this.cadastre = Array.of(response)
        console.log(this.cadastre)
      })
    })
  }

  format(valString) {
    if (!valString) {
      return '';
    }
    let val = valString.toString();
    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
    this.pureResult = parts;
    if (parts[0].length >= 11) {
      this.maskedId = this.cellphone(parts[0]);
      return this.maskedId;
    } else {
      this.maskedId = this.phone(parts[0]);
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
  cellphone(v) {
    v = v.replace(/^(\d{0,2})(\d{0,5})(.*)/, '($1) $2-$3');
    return v;
  }
  phone(v){
    v = v.replace(/^(\d{0,2})(\d{0,4})(.*)/, '($1) $2-$3');
    return v;
  }

}
