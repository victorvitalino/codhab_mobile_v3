import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchedulePage } from './schedule';
import { MyDatePickerModule } from 'mydatepicker';
@NgModule({
  declarations: [
    SchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(SchedulePage),
    MyDatePickerModule
  ],
})
export class SchedulePageModule {}
