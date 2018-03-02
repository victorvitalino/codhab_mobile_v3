import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HabitationProvider } from '../../../providers/habitation/habitation';


@IonicPage()
@Component({
  selector: 'page-habitation-search',
  templateUrl: './show.html',
})
export class HabitationSearchPage {
candidate: any;
entity: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public data:HabitationProvider, public load:LoadingController) {
  }

  searchCandidate(value){
    let loader = this.load.create({
      content: "Pesquisando..."
    });
    loader.present();
    if(value.length <= 11){
      this.data.getCandidate(value)
        .subscribe((response) => {
          this.candidate = response;
          console.log(this.candidate);
          loader.dismiss();
        });
    }else{
      this.data.getEntity(value)
      .subscribe((response)=>{
        this.entity = response;
        console.log(this.entity)
        loader.dismiss();
      })
    }
  }
}
