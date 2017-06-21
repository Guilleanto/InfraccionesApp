import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {HomePage} from "../home/home";
import { UsuarioService } from "../../providers/registrar"

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

usuario:string="";
password:string="";



  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _us: UsuarioService ) {
  }

  ingresar(){

      this._us.ingresar( this.usuario, this.password )
        .subscribe( ()=>{

            if( this._us.activo() ){
                  this.navCtrl.setRoot(HomePage);
            }

        })

  }
}
