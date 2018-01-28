import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SchedulesProvider } from '../../providers/schedules/schedules';

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private service:SchedulesProvider) {
  }
  ngOnInit() {
    this.service.getSchedules()
  }
}
