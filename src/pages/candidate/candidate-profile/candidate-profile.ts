import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LoginServiceProvider } from '../../../providers/login-service/login-service';


@IonicPage()
@Component({
  selector: 'page-candidate-profile',
  templateUrl: 'candidate-profile.html',
})
export class CandidateProfilePage {
  profile_user: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public load:LoadingController,
    public service: LoginServiceProvider) {
  }

  ngOnInit() {
    let loader = this.load.create({
      content: "Carregando Dados",
      spinner: 'crescent'
    });
    loader.present();
      this.service.getData().then((response)=>{
        this.service.getCheckCandidate(response.cpf).subscribe((resp) =>{
          this.profile_user = Array.of(resp);
          console.log(this.profile_user)
          loader.dismiss();
        })
      });
      
  }

  goToCadastre(){
    this.navCtrl.push('CandidateProfileCadastrePage');
  }
  goToDependents(){
    this.navCtrl.push('CandidateProfileDependentsPage');
  }
  goToAddress(){
    this.navCtrl.push('CandidateProfileAddressVinculationPage');
  }
  goToDocuments(){
    this.navCtrl.push('CandidateProfileDocumentsPage');
  }
  goToEntity(){
    this.navCtrl.push('CandidateProfileEntityPage');
  }
  goToIndication(){
    this.navCtrl.push('CandidateProfileIndicationPage');
  }
  goToIptu(){
    this.navCtrl.push('CandidateProfileIptuPage');
  }
  goToPontuation(){
    this.navCtrl.push('CandidateProfilePontuationPage');
  }
  goToSituation(){
    this.navCtrl.push('CandidateProfileSituationPage');
  }
  goToRequirements(){
    this.navCtrl.push('CandidateProfileRequirementsPage');
  }
  goToSchedules(){
    this.navCtrl.push('CandidateProfileSchedulesPage');
  }
  goToUpdates(){
    this.navCtrl.push('CandidateProfileUpdatesPage');
  }
  goToWallet(){
    this.navCtrl.push('CandidateProfileIncomePage')
  }
}
