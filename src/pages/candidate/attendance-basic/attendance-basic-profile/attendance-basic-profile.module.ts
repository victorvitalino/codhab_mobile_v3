import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceBasicProfilePage } from './attendance-basic-profile';

@NgModule({
  declarations: [
    AttendanceBasicProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceBasicProfilePage),
  ],
})
export class AttendanceBasicProfilePageModule {}
