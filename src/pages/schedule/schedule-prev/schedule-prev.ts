import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IMyDpOptions, IMyDateModel, IMyInputFieldChanged} from 'mydatepicker';
import { isToday } from 'date-fns';


@IonicPage()
@Component({
  selector: 'page-schedule-prev',
  templateUrl: 'schedule-prev.html',
})
export class SchedulePrevPage {
  private locale:string = 'pt-br';
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
    editableDateField: false,
    openSelectorOnInputClick: true,
  };
  // Initialized to specific date (09.10.2018).
  public model: any = { date: isToday };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePrevPage');
  }
  onInputFieldChanged(event: IMyInputFieldChanged) {
    console.log('onInputFieldChanged(): Value: ', event.value, ' - dateFormat: ', event.dateFormat, ' - valid: ', event.valid);
  }

}
