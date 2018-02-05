import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceDetailPage } from './attendance-detail';

@NgModule({
  declarations: [
    AttendanceDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceDetailPage),
  ],
})
export class AttendanceDetailPageModule {}
