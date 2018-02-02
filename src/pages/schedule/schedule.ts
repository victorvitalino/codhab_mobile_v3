import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IMyDpOptions, IMyDateModel, IMyInputFieldChanged } from 'mydatepicker';
import { isToday } from 'date-fns';

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  private locale: string = 'pt-br';
  public myDatePickerOptions: IMyDpOptions = {

    dateFormat: 'dd.mm.yyyy',
    editableDateField: false,
    openSelectorOnInputClick: true,
  };
  public model: string = null;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  public ngOnInit() {

  }
  onInputFieldChanged(event: IMyInputFieldChanged) {
    console.log('onInputFieldChanged(): Value: ', event.value, ' - dateFormat: ', event.dateFormat, ' - valid: ', event.valid);
  }

}