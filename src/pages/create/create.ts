import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

id:string="";
user_id:string="";
nombre:string="";
apellido:string="";
cedula:string="";
direccion:string="";
correo:string="";
telefono:string="";
licencia:string="";




  constructor(private storage:Storage, public navCtrl: NavController,
   public navParams: NavParams, private _cs: CreateService) {
  }



registrar(){


  this.user_id = localStorage.getItem("id_usuario");
  console.log(this.user_id);
  this._cs.registrar(this.id, this.user_id, this.nombre, this.apellido,
   this.cedula,  this.direccion, this.correo, this.telefono, this.licencia).subscribe( ()=>{

  })
}
}
