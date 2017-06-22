import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {InfraccionesPage} from "../infracciones/infracciones";

import { InfraccionesService } from '../../providers/infracciones';
import { NuevainfraccionPage } from "../nuevainfraccion/nuevainfraccion";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {




  data: any;

  constructor(public navCtrl: NavController,
    private _ps: InfraccionesService,
     public navParams: NavParams,
     public viewCtrl: ViewController) {

    this.viewCtrl.dismiss();

    this.data = {};
    this.data.cedula = {};
  }

buscar(){ //inicia busqueda por cedula y se lleva a otra vista con esa cedula
  let cedula = this.data.cedula;
  console.log("Dato enviado", cedula);
  this.navCtrl.push (InfraccionesPage, { "ID":
      cedula });

      }
}
