import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController  } from 'ionic-angular';
import { UserDataProvider } from '../../../../providers/user-data/user-data';
import { AttendanceProvider } from '../../../../providers/attendance/attendance';
import { CodhabCommonProvider } from '../../../../providers/codhab-common/codhab-common';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { DateTime } from 'ionic-angular/components/datetime/datetime';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-attendance-cadastre-convocation',
  templateUrl: 'attendance-cadastre-convocation.html',
})
export class AttendanceCadastreConvocationPage {
  imageURI: any;
  imageFileName: any;
  user_token: string = '';
  user_name: string = '';
  attendance_id: number;
  mirror_id: number;
  cadastre: any;
  gender: any;
  states: any;
  special: any;
  civilStates: any;
  first_civil_id: number;
  bornCities: any;
  workCities: any;
  weddingCheck: boolean = false;
  specialCheck: boolean = false;
  employ: boolean = false;
  startDateBorn: string;
  startDateWedding: string;
  startDateArrival: string;
  startDateAdmission: string;



  @ViewChild('attendanceSlider') attendanceSlider: any;

  slideOneForm: FormGroup;

  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController, 
    public load:LoadingController,
    private userService: UserDataProvider, 
    private common:CodhabCommonProvider,
    public formBuilder: FormBuilder,
    private attendanceService:AttendanceProvider) {
      

    this.slideOneForm = formBuilder.group({
      name:'',
      cpf:'',
      gender_id:'',
      mother_name:'',
      father_name:'',
      born:'',
      nationality:'',
      civil_state_id:'',
      wedding_date:'',
      wedding_regime:'',
      rg:'',
      rg_uf_id:'',
      rg_org:'',
      arrival_df:'',
      born_uf_id:'',
      place_birth: this.bornCities,
      employment:'',
      work_cep:'',
      work_state_id:'',
      work_city:'',
      work_address:'',
      admission_date:'',
      cid:'',
      nis:'',
      special_condition:'',
      special_condition_type_id:'',
      adapted_property:''

    });
      this.getGender()
      this.getStates()
      this.getSpecials()
      this.getCivilStates()
  }
  ionViewDidLoad() {
    this.userService.getData().then((resp) => {
      this.attendance_id = this.navParams.get('id')
      this.user_token = resp.auth
      this.user_name = resp.name
      this.attendanceService.getAttendanceMirror(this.user_token, this.attendance_id).subscribe((resp) => {
        this.mirror_id = resp.id;
        this.civilCheck(resp.civil_state_id)
        this.employmentCheck(resp.employment)
        console.log(resp.special_condition)
        this.specialConditionCheck(resp.especial_condition)
        this.cadastre = Array.of(resp)
        console.log(this.cadastre)
        console.log(this.cadastre[0]['born'], this.cadastre[0]['arrival_df'], this.cadastre[0]['wedding_date'], this.cadastre[0]['admission_date'])
        if (this.cadastre[0]['born'] == undefined) {
          this.startDateBorn = new Date('01/01/2018').toISOString();
        } else {
          let date = this.cadastre[0]['born']
          let res = date.split("/");
          this.startDateBorn = new Date(res[1] + "/" + res[0] + "/" + res[2]).toISOString();
        }
        if (this.cadastre[0]['wedding_date'] == undefined || this.cadastre[0]['wedding_date'] == null || this.cadastre[0]['wedding_date'] == '' || this.cadastre[0]['wedding_date'] == NaN) {
          this.startDateWedding = new Date('01/01/2018').toISOString();
        } else {
          let date = this.cadastre[0]['wedding_date']
          let res = date.split("/");
          this.startDateWedding = new Date(res[1] + "/" + res[0] + "/" + res[2]).toISOString();
        }
        if (this.cadastre[0]['arrival_df'] == undefined) {
          this.startDateArrival = new Date('01/01/2018').toISOString();
        } else {
          let date = this.cadastre[0]['arrival_df']
          let res = date.split("/");
          this.startDateArrival = new Date(res[1] + "/" + res[0] + "/" + res[2]).toISOString();
        }
        if (this.cadastre[0]['admission_date'] === undefined) {
          this.startDateAdmission = new Date('01/01/2018').toISOString();
        } else {
          let date = this.cadastre[0]['admission_date']
          let res = date.split("/");
          this.startDateAdmission = new Date(res[1] + "/" + res[0] + "/" + res[2]).toISOString();
        }
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
    if(check === "true" || check === true){
      this.specialCheck= true
    }else{
      this.specialCheck = false
    }
  }
  employmentCheck(check){
    console.log(check)
    if(check === "true" || check === true){
      this.employ = true
    }else{
      this.employ = false
    }
  }

  next() {
    this.attendanceSlider.slideNext();
  }

  prev() {
    this.attendanceSlider.slidePrev();
  }

  save() {
    let loader = this.load.create({
      content: "Salvando Dados",
      spinner: 'crescent'
    });

    loader.present();
    this.attendanceService.updateCadastre(this.user_token,this.attendance_id,this.mirror_id,this.slideOneForm.value,)
    .subscribe((resp)=>{
      console.log(resp)
      loader.dismiss();
      this.navCtrl.pop();
    })

  }


  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Enviando..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }

    fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
      .then((data) => {
        console.log(this.imageURI);
        console.log(data + " Uploaded Successfully");
        this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
        loader.dismiss();
        this.presentToast("Imagem enviada com sucesso");
      }, (err) => {
        console.log(err);
        loader.dismiss();
        this.presentToast(err);
      });
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 6000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Mensagem Fechada');
    });

    toast.present();
  }
}
