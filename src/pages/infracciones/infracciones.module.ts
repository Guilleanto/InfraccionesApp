import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfraccionesPage } from './infracciones';

@NgModule({
  declarations: [
    InfraccionesPage,
  ],
  imports: [
    IonicPageModule.forChild(InfraccionesPage),
  ],
  exports: [
    InfraccionesPage
  ]
})
export class InfraccionesPageModule {}
