import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { LoginServiceProvider } from '../../../../providers/login-service/login-service';


@IonicPage()
@Component({
  selector: 'page-candidate-profile-cadastre',
  templateUrl: 'candidate-profile-cadastre.html',
})
export class CandidateProfileCadastrePage {
  private profile_user: object;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public load:LoadingController,
  public service:LoginServiceProvider) {
  }

  ngOnInit() {
    let loader = this.load.create({
      content: "Carregando Dados",
      spinner: 'crescent'
    });
    loader.present();
    this.service.getData().then((response) => {
      this.service.getCheckCandidate(response.cpf).subscribe((resp) => {
        this.profile_user = Array.of(resp);
        console.log(this.profile_user)
        loader.dismiss();
      })
    });

  }

}
