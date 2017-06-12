import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscarPage } from './buscar';

@NgModule({
  declarations: [
    BuscarPage,
  ],
  imports: [
    IonicPageModule.forChild(BuscarPage),
  ],
  exports: [
    BuscarPage
  ]
})
export class BuscarPageModule {}
