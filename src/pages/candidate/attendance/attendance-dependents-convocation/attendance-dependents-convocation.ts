import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
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
  loader: any;
  dependents_new: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
          private userService: UserDataProvider, 
          public load:LoadingController,
          public alertCtrl:AlertController,
          private attendanceService: AttendanceProvider) {
  }

  ionViewWillEnter() {

   this.loader = this.load.create({
      content: "Buscando Dados",
      spinner: 'crescent'
    });

    this.userService.getData().then((resp) => {
      this.attendance_id = this.navParams.get('id')
      this.user_name = resp.name;
      this.user_token = resp.auth;
      this.loader.present();
      this.getDependents()
      this.loader.dismiss();
      
    });
  }
  
  getDependents(){
    this.attendanceService.getDependents(this.user_token, this.attendance_id).subscribe((resp) => {
      this.dependents = resp
      if (resp.length > 0) {
        this.dependents_new = false
      }else{
        this.dependents_new = true
      }
    })
  }

  addDependent(id){
    this.navCtrl.push('AttendanceDependentsConvocationNewPage',{id})
  }
  removeDependent(dependent_id){
    this.attendanceService.removeDependent(this.user_token,dependent_id,this.attendance_id).subscribe((resp)=>{
      if(resp.deleted === true){
        this.getDependents()
      }
    })
  }

  editDependent(dependent_id){
    this.navCtrl.push('AttendanceDependentsConvocationEditPage',{attendance:this.attendance_id,dependent:dependent_id})
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

}
