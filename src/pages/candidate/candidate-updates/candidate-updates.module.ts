import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CandidateUpdatesPage } from './candidate-updates';
import { LOCALE_ID } from '@angular/core';
import localePtBr from '@angular/common/locales/pt';

import { registerLocaleData } from '@angular/common';

registerLocaleData(localePtBr); 

@NgModule({
    providers: [
      {provide: LOCALE_ID, useValue: 'pt-BR'}
    ],
  declarations: [
    CandidateUpdatesPage,
  ],
  imports: [
    IonicPageModule.forChild(CandidateUpdatesPage),
  ],
})
export class CandidateUpdatesPageModule {}
