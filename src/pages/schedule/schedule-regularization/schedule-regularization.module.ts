import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduleRegularizationPage } from './schedule-regularization';
import { MyDatePickerModule } from 'mydatepicker';
@NgModule({
  declarations: [
    ScheduleRegularizationPage,
  ],
  imports: [
    IonicPageModule.forChild(ScheduleRegularizationPage),
    MyDatePickerModule
  ],
})
export class ScheduleRegularizationPageModule {}
