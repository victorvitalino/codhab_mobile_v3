import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceBasicDependentPage } from './attendance-basic-dependent';

@NgModule({
  declarations: [
    AttendanceBasicDependentPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceBasicDependentPage),
  ],
})
export class AttendanceBasicDependentPageModule {}
