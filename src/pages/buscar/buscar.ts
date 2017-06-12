import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {InfraccionesPage} from "../infracciones/infracciones";

import { InfraccionesService } from '../../providers/infracciones';

/**
 * Generated class for the BuscarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-buscar',
  templateUrl: 'buscar.html',
})
export class BuscarPage {

//this.data.id = "";
data: any;

  constructor(public navCtrl: NavController,  private _ps: InfraccionesService, public navParams: NavParams) {

    this.data = {};
    this.data.id = {};
  }

buscar(){
  this.navCtrl.push (InfraccionesPage, { "ID":
      this.data.id });

}

}
