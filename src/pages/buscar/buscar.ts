import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController } from 'ionic-angular';
import {InfraccionesPage} from "../infracciones/infracciones";

import { InfraccionesService } from '../../providers/infracciones';

/**
 * Generated class for the BuscarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-buscar',
  templateUrl: 'buscar.html',
})
export class BuscarPage {

//this.data.id = "";
data: any;

  constructor(public navCtrl: NavController,
    private _ps: InfraccionesService,
     public navParams: NavParams,
     public viewCtrl: ViewController) {

    this.viewCtrl.dismiss();

    this.data = {};
    this.data.id = {};
  }

buscar(){
  let id = this.data.id;
  console.log("Dato enviado", id);
  this.navCtrl.push (InfraccionesPage, { "ID":
      id });

}

}
