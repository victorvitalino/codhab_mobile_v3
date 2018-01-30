import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceBasicContactPage } from './attendance-basic-contact';

@NgModule({
  declarations: [
    AttendanceBasicContactPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceBasicContactPage),
  ],
})
export class AttendanceBasicContactPageModule {}
