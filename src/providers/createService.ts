import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from "@ionic/storage";

import { URL_SERVICIOS } from '../config/url.services';
import { AlertController, Platform } from "ionic-angular";
import { LoadingController } from 'ionic-angular';

import {HomePage} from "../pages/home/home";


@Injectable()
export class CreateService {

id_usuario:any;

  constructor(public http: Http, private alertCtrl: AlertController,
    private platform: Platform, private storage:Storage, public loadingCtrl: LoadingController) {

    //solo se cargara una vez
  }
registrar( id:string, user_id:string, nombre:string, apellido:string,
  cedula:string, correo:string, direccion:string, licencia:string, telefono:string){


  let data = new URLSearchParams();

  data.append("id", id);
  data.append("user_id", user_id);
  data.append("nombre", nombre);
  data.append("apellido", apellido);
  data.append("cedula", cedula);
  data.append("correo", correo);
  data.append("direccion", direccion);
  data.append("licencia", licencia);
  data.append("telefono" ,telefono);

  let url = URL_SERVICIOS + "infractor" // OJO

  return this.http.post( url, data).map(resp =>{

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
                     // this.navCtrl.setRoot(HomePage);
                    }
            })
}



  }



