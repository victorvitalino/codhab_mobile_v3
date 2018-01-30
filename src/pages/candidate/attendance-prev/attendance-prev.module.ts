import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendancePrevPage } from './attendance-prev';

@NgModule({
  declarations: [
    AttendancePrevPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendancePrevPage),
  ],
})
export class AttendancePrevPageModule {}
