import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';


import { InfraccionesService } from '../../providers/infracciones';

@Component({
  selector: 'page-busqueda',
  templateUrl: 'busqueda.html',
})
export class BusquedaPage {

  constructor(public navCtrl: NavController,
    private _ps: InfraccionesService,
    public navParams: NavParams) {
  }


}
