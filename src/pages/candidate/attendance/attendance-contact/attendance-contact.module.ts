import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceContactPage } from './attendance-contact';

@NgModule({
  declarations: [
    AttendanceContactPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceContactPage),
  ],
})
export class AttendanceContactPageModule {}
