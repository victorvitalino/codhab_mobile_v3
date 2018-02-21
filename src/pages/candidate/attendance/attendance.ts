import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
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
    public alertCtrl:AlertController,
    public loadingCtrl:LoadingController,
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
    let loader = this.loadingCtrl.create({
      content: "Carregando Dados",
      spinner: 'crescent'
    });

    loader.present();
    this.attendanceService.getAttendances(this.user_token)
    .subscribe((resp) => {
      loader.dismiss(); 
      if(resp == undefined){
        this.presentAlert();
      }else{
        this.attendances = resp
        this.attendances.forEach(element => {
          if (element['current_situation_name'] === "Em atualização"){
            this.attendance_new = false;
          }
        });
      }
    })
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      enableBackdropDismiss:false,
      subTitle: '<b>'+this.user_name+'</b>,sua sessão expirou, porfavor verifique sua conexão e faça novamente o login. Você será redirecionado para efetuar o login novamente.',
      buttons: [
        {
          text: 'Entendi',
          handler: () => {
            this.navCtrl.setRoot('WelcomePage')
          }
        }
      ]
    });
    alert.present();
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
