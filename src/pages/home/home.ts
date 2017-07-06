import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import {InfraccionesPage} from "../infracciones/infracciones";
import { Storage } from "@ionic/storage";
import { InfraccionesService } from '../../providers/infracciones';
import { NuevainfraccionPage } from "../nuevainfraccion/nuevainfraccion";
import { UsuarioService } from "../../providers/registrar";

import {LoginPage} from "../login/login";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data: any;

  constructor(public navCtrl: NavController,
    private _ps: InfraccionesService,
    private _us:UsuarioService,
     public navParams: NavParams,
     public viewCtrl: ViewController,
     public loadCtrl: LoadingController,
     public storage: Storage ) {

    this.viewCtrl.dismiss();
    this.data = {};
    this.data.cedula = {};
  }

buscar(){
  //inicia busqueda por cedula y se lleva a otra vista con esa cedula
  let cedula = this.data.cedula;
  //this.storage.set('cedula_infractor', cedula);
  console.log("Dato enviado", cedula);
  this.navCtrl.push (InfraccionesPage, { "ID":
      cedula });

      }


      cerrar(){
    this._us.cerrar_sesion();
        this.navCtrl.setRoot(LoginPage);
    }

    nuevaInfraccion(){
      this.navCtrl.push(NuevainfraccionPage);
    }

}
