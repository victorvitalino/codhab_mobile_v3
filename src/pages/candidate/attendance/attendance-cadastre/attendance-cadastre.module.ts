import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceCadastrePage } from './attendance-cadastre';

@NgModule({
  declarations: [
    AttendanceCadastrePage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceCadastrePage),
  ],
})
export class AttendanceCadastrePageModule {}
