import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-habitation',
  templateUrl: 'habitation.html',
})
export class HabitationPage {
  imageURI:any;
  imageFileName:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private transfer: FileTransfer,
     private camera: Camera,
     public loadingCtrl: LoadingController,
     public toastCtrl: ToastController){
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
    console.log(data+" Uploaded Successfully");
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad HabitationPage');
  }

}
