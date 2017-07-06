import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from "@ionic/storage";

import { URL_SERVICIOS } from '../config/url.services';
import { AlertController, Platform } from "ionic-angular";
import { LoadingController } from 'ionic-angular';

import {HomePage} from "../pages/home/home";


@Injectable()
export class CreateService {

id_usuario:any;
id_infractor:any;
  constructor(public http: Http, private alertCtrl: AlertController,
    private platform: Platform, private storage:Storage, public loadingCtrl: LoadingController) {

    //solo se cargara una vez
  }
registrar( id:string, user_id:string, nombre:string, apellido:string,
  cedula:string, direccion:string, correo:string, telefono:string, licencia:string){

  //this.id_usuario = id;
  let data = new URLSearchParams();

  data.append("id", id);
  data.append("user_id", user_id);
  data.append("nombre", nombre);
  data.append("apellido", apellido);
  data.append("cedula", cedula);
  data.append("direccion", direccion);
  data.append("correo", correo);
  data.append("telefono" ,telefono);
  data.append("licencia", licencia);


  let url = URL_SERVICIOS + "infractor";// OJO

  return this.http.post( url, data).map(resp =>{
        console.log(data);
         let data_resp = resp.json();

                    console.log (data_resp);

                    if(data_resp.error){
                          this.alertCtrl.create({
                            title: "error al registrar",
                            subTitle: data_resp.error,
                            buttons: ["OK"]
                          }).present();
                        console.log("ERROR");
                    }else{

                      this.alertCtrl.create({
                        title:"Infractor Registrado",
                        subTitle: "Ifraccion Guardada",
                        buttons: ["OK"]
                      }).present();
                      this.id_infractor = this.id_usuario;
                      console.log(this.id_infractor);
                      this.storage.set('infractor',this.id_infractor);
                     // this.navCtrl.setRoot(HomePage);
                    }
            })
}



  }



