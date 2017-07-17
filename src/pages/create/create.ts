import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {HomePage} from "../home/home";
import { Storage } from "@ionic/storage";
import { CreateService } from "../../providers/createService";
/**
 * Generated class for the CreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {


user_id:string="";
nombre:string="";
apellido:string="";
cedula:any;
direccion:string="";
correo:string="";
telefono:string="";
licencia:string="";




  constructor(private storage:Storage, public loadCtrl:  LoadingController, public navCtrl: NavController,
   public navParams: NavParams, private _cs: CreateService) {
     this.storage.get("cedula_infractor").then( value =>{
  this.cedula = value;
});
  }



registrar(){


  this.user_id = localStorage.getItem("id_usuario");
  console.log(this.user_id, this.licencia);
  this._cs.registrar( this.user_id, this.nombre, this.apellido,
   this.cedula,  this.direccion, this.correo, this.telefono, this.licencia).subscribe( ()=>{

  })
    let loader = this.loadCtrl.create({
          content:"Registrando...",
      });loader.present();
       setTimeout(()=>{
          loader.dismiss();
          this.navCtrl.setRoot(HomePage);
                }, 3000)

}
}
