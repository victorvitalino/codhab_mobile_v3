import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceBasicPage } from './attendance-basic';

@NgModule({
  declarations: [
    AttendanceBasicPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceBasicPage),
  ],
})
export class AttendanceBasicPageModule {}
