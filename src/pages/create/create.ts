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

id:string;
nombre:string;
apellido:string;
cedula:string;
correo:string;
direccion:string;
licencia:string;
telefono:string;
user_id:string;
id_u:string;

  constructor(private storage:Storage, public navCtrl: NavController, public navParams: NavParams, public _cs: CreateService) {
  }

this.id_u = localStorage.getItem("id_usuario");
user_id:string =  this.id_u;
registrar(){
  this._cs.registrar(this.id, this.user_id, this.nombre, this.apellido, this.cedula, this.correo, this.direccion, this.licencia, this.telefono).subscribe(()=>{

  })
}
}
