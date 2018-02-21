import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceDependentsConvocationNewPage } from './attendance-dependents-convocation-new';
import { LOCALE_ID } from '@angular/core';
import localePtBr from '@angular/common/locales/pt';

import { registerLocaleData } from '@angular/common';

registerLocaleData(localePtBr); 
@NgModule({
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  declarations: [
    AttendanceDependentsConvocationNewPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceDependentsConvocationNewPage),
  ],
})
export class AttendanceDependentsConvocationNewPageModule {}
