import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { URL_SERVICIOS } from '../config/url.services';
import { AlertController, Platform } from "ionic-angular";
import { LoadingController } from 'ionic-angular';

import { Storage } from "@ionic/storage";


import {HomePage} from "../pages/home/home";

@Injectable()
export class UsuarioService {

token:string;
id_usuario:string;


  constructor(public http: Http, private  alertCtrl: AlertController,
  private platform:Platform, private storage:Storage, public loadingCtrl: LoadingController  ) {
this.cargar_storage();
  }

activo():boolean{

  if(this.token){
    return true;
  }else{
    return false;
  }
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
                        subTitle: "Infraccion Guardada",
                        buttons: ["OK"]
                      }).present();
                     // this.navCtrl.setRoot(HomePage);
                    }
                  })
    }


    ingresar( usuario:string, password:string){










      let data = new URLSearchParams();
      data.append("usuario", usuario);
      data.append("password", password);


      let url = URL_SERVICIOS + "auth";
//OBSERVADOR
      return this.http.post( url, data )
          .map( resp =>{

            let data_resp = resp.json();

            console.log(data_resp);

            if( data_resp.token ){
              this.alertCtrl.create({
                  title: "ingreso exitoso",
                subTitle: "Login",
                buttons: ["OK"]
              }).present();
              this.token = data_resp.token;
              this.id_usuario = data_resp.id_usuario;
              console.log(this.id_usuario);

              this.guardar_storage();

            }else{
              //console.log(data_resp);
              this.alertCtrl.create({
                title: "Error al iniciar",
                subTitle: data_resp.error,
                buttons: ["OK"]
              }).present();
            }
//STORAGE
          });

    }

    cerrar_sesion(){

      this.token = null;
      this.id_usuario = null;

      this.guardar_storage();
    }


 guardar_storage(){
      if( this.platform.is("cordova")){
        //DISPOSITIVO
        this.storage.set('token', this.token );
        this.storage.set('id_usuario', this.id_usuario);
      }else{
        //en la PC

          if( this.token ){
            localStorage.setItem("token", this.token);
            localStorage.setItem("id_usuario", this.id_usuario);
          }else{
          localStorage.removeItem("token");
          localStorage.removeItem("id_usuario");
          }
      }
    }

    cargar_storage(){

      let promesa = new Promise((resolve, reject)=>{


        if(this.platform.is("cordova")){

          this.storage.ready()
                .then(()=>{

            this.storage.get("token")
                  .then( token=>{
              if(token){
                this.token = token;
              }
            })
                this.storage.get("id_usuario")
                        .then( id_usuario=>{
              if(id_usuario){
                this.id_usuario = id_usuario;
              }
              resolve();
            })


          })

        }else{

          if( localStorage.getItem("token") ){

            this.token = localStorage.getItem("token");
            this.id_usuario = localStorage.getItem("id_usuario");
          }
            resolve();
        }

      });
      return promesa;
    }
}