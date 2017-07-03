import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import {HomePage} from "../home/home";
import { UsuarioService } from "../../providers/registrar";
import { Storage } from "@ionic/storage";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

usuario:string="";
password:string="";
public loggedin : any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _us: UsuarioService, private storage:Storage, private  alertCtrl: AlertController, private loadCtrl: LoadingController ) {

    let loader = this.loadCtrl.create({
          content: "Cargando...",
        });
      loader.present();
      setTimeout(()=>{
        this.loggedin = localStorage.getItem("token");
          console.log(this.loggedin);
        //this.loggedin = this.storage.get('token');
            if(this.loggedin != null){
              this.navCtrl.setRoot(HomePage);
            }
        // 1000
        setTimeout(()=>{
          loader.dismiss();
                }, 1000)
    });
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
