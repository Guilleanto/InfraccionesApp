import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

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
    private _us: UsuarioService, private  alertCtrl: AlertController, private loadCtrl: LoadingController ) {
  }

  ingresar(){
      let loader = this.loadCtrl.create({
          content:"Ingresando..",

      });
      loader.present();




      this._us.ingresar( this.usuario, this.password )
        .subscribe( ()=>{

            if( this._us.activo() ){
                  this.navCtrl.setRoot(HomePage);
                  loader.dismiss();
            }else{


            }

        }, error =>{
              this.alertCtrl.create({
                        title:"Error",
                        subTitle: "Error al Ingresar",
                        buttons: ["OK"]
                      }).present();
              loader.dismiss();
        });

  }
}
