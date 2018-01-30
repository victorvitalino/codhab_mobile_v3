import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceBasicIncomePage } from './attendance-basic-income';

@NgModule({
  declarations: [
    AttendanceBasicIncomePage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceBasicIncomePage),
  ],
})
export class AttendanceBasicIncomePageModule {}
