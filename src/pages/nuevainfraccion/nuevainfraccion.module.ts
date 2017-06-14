import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevainfraccionPage } from './nuevainfraccion';

@NgModule({
  declarations: [
    NuevainfraccionPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevainfraccionPage),
  ],
  exports: [
    NuevainfraccionPage
  ]
})
export class NuevainfraccionPageModule {}
