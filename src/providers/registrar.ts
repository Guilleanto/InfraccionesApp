import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { URL_SERVICIOS } from '../config/url.services';
import {AlertController} from "ionic-angular";


import {HomePage} from "../pages/home/home";

@Injectable()
export class UsuarioService {




  constructor(public http: Http,public  alertCtrl: AlertController ) {

  }


registrar( id:string, infractor_id:string, fecha:string, hora:string, lugar:string, tipo_vehiculo:string,
modelo_vehiculo:string, placa_vehiculo:string, color_vehiculo:string, serial_vehiculo:string, retuvo_vehiculo:string,
id_articulo:string, retuvo_licencia:string, importe_pagar:string, ano_vehiculo:string){

    let data = new URLSearchParams();
    data.append("id" , id );
    data.append("infractor_id" , infractor_id );
    data.append("fecha" , fecha );
    data.append("hora" , hora );
    data.append("lugar" , lugar);
    data.append("tipo_vehiculo" , tipo_vehiculo );
    data.append("modelo_vehiculo" , modelo_vehiculo );
    data.append("placa_vehiculo" , placa_vehiculo );
    data.append("color_vehiculo" , color_vehiculo );
    data.append("serial_vehiculo" , serial_vehiculo );
    data.append("retuvo_vehiculo" , retuvo_vehiculo );
    data.append("id_articulo" , id_articulo );
    data.append("retuvo_licencia" , retuvo_licencia );
    data.append("importe_pagar" , importe_pagar );
    data.append("ano_vehiculo" , ano_vehiculo );


      let url = URL_SERVICIOS + "infracciones";

      return this.http.post( url, data)
                  .map(resp =>{

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
                        title:"registrado",
                        subTitle: "Ifraccion Guardada",
                        buttons: ["OK"]
                      }).present();
                     // this.navCtrl.setRoot(HomePage);
                    }
                  })
    }
}
