import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { InfraccionesService } from '../../providers/infracciones';

@IonicPage()
@Component({
  selector: 'page-busqueda',
  templateUrl: 'busqueda.html',
})
export class BusquedaPage {

  constructor(public navCtrl: NavController,
    private _ps: InfraccionesService,
    public navParams: NavParams) {
  }

buscar_productos( ev:any ){

  let valor = ev.target.value;
  console.log(valor);

  this._ps.buscar_infraccion( valor );
}
}
