import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceIncomePage } from './attendance-income';

@NgModule({
  declarations: [
    AttendanceIncomePage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceIncomePage),
  ],
})
export class AttendanceIncomePageModule {}
