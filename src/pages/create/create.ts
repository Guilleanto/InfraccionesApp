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
@IonicPage()
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
correo:string="";
direccion:string="";
licencia:string="";
telefono:string="";



  constructor(private storage:Storage, public navCtrl: NavController,
   public navParams: NavParams, private _cs: CreateService) {
  }



registrar(){


  this.user_id = localStorage.getItem("id_usuario");
  this._cs.registrar(this.id, this.user_id, this.nombre, this.apellido, this.cedula, this.correo, this.direccion, this.licencia, this.telefono)
  .subscribe(()=>{

  })
}
}
