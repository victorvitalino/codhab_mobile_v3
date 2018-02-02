import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IMyDpOptions, IMyDateModel, IMyInputFieldChanged } from 'mydatepicker';
import { isToday } from 'date-fns';


@IonicPage()
@Component({
  selector: 'page-schedule-regularization',
  templateUrl: 'schedule-regularization.html',
})
export class ScheduleRegularizationPage {
  private locale: string = 'pt-br';
  public myDatePickerOptions: IMyDpOptions = {

    dateFormat: 'dd.mm.yyyy',
    editableDateField: false,
    openSelectorOnInputClick: true,
  };
  public model: any = { date: isToday };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  public ngOnInit() {

  }

}