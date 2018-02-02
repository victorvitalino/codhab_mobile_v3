import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchedulePrevPage } from './schedule-prev';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  declarations: [
    SchedulePrevPage,
  ],
  imports: [
    IonicPageModule.forChild(SchedulePrevPage),
    MyDatePickerModule
  ],
})
export class SchedulePrevPageModule {}
