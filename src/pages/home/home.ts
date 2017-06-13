import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {InfraccionesPage} from "../infracciones/infracciones";

import { InfraccionesService } from '../../providers/infracciones';


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
    this.data.id = {};
  }

buscar(){
  let id = this.data.id;
  console.log("Dato enviado", id);
  this.navCtrl.push (InfraccionesPage, { "ID":
      id });

}


}
