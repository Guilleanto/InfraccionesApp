import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Request, RequestMethod, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { URL_SERVICIOS } from '../config/url.services';
import { AlertController, Platform } from "ionic-angular";
import { LoadingController } from 'ionic-angular';
import {InfraccionesPage} from "../pages/infracciones/infracciones";
import { Storage } from "@ionic/storage";
import {HomePage} from "../pages/home/home";

@Injectable()
export class UsuarioService {

token:string;
id_usuario:string;
cedula:any;
mailgunUrl: string;
mailgunApiKey: string;
requestHeaders = new Headers();

  constructor(public http: Http, private  alertCtrl: AlertController,
  private platform:Platform, private storage:Storage, public loadingCtrl: LoadingController,
  ) {
     this.mailgunUrl = "mail.basebapp.com";
    this.mailgunApiKey = window.btoa("api:key-3cc4e50a46b5410431a2e61855b27443");

    this.requestHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    this.requestHeaders.append("Authorization", "Basic " + this.mailgunApiKey);
this.cargar_storage();
  }

activo():boolean{
  if(this.token){
    return true;
  }else{
    return false;
  }
}
registrar( infractor_id:string, fecha:string, hora:string, lugar:string, tipo_vehiculo:string,
modelo_vehiculo:string,ano_vehiculo:string, placa_vehiculo:string, color_vehiculo:string, retuvo_vehiculo:string,
id_articulo:string, retuvo_licencia:string, importe_pagar:string, numerales:string){
// para ligar  los datos de los parametros con el plugin URLSEARCHPARAMS()
    let data = new URLSearchParams();

    data.append("infractor_id" , infractor_id );
    data.append("fecha" , fecha );
    data.append("hora" , hora );
    data.append("lugar" , lugar);
    data.append("tipo_vehiculo" , tipo_vehiculo );
    data.append("modelo_vehiculo" , modelo_vehiculo );
    data.append("ano_vehiculo" , ano_vehiculo );
    data.append("placa_vehiculo" , placa_vehiculo );
    data.append("color_vehiculo" , color_vehiculo );
    data.append("retuvo_vehiculo" , retuvo_vehiculo );
    data.append("id_articulo" , id_articulo );
    data.append("retuvo_licencia" , retuvo_licencia );
    data.append("importe_pagar" , importe_pagar );
    data.append("numerales" , numerales );




      let url = URL_SERVICIOS + "infracciones";//INVOCA LA RUTA DE LA API PARA GUARDAR

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
                        title:"registrado",
                        subTitle: "Infraccion Guardada",
                        buttons: ["OK"]
                      }).present();
                    }
                  })
    }


    ingresar( usuario:string, password:string){ //FUNCION PARA INGRESAR SESION

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

    cerrar_sesion(){//CERRAR SESSION
      localStorage.clear();
      this.storage.clear();

    }


 guardar_storage(){//GUARDAR EN LA MEMORIA DEL DISPOSITIVO Y NAVEGADOR
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

    cargar_storage(){//CARGAR DATOS DE LA MEMORIA DE NAVEGADRO O DISPOSITIVO

      let promesa = new Promise((resolve, reject)=>{ //mediante promesas (METODO DE PROGRAMACION)


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
EnviarEmail(recipient: string, subject: string, message: string){
   let loader = this.loadingCtrl.create({
      content:'Enviando infracción..'
    });
    loader.present();
            this.http.request(new Request({
            method: RequestMethod.Post, //test@example.com
            url: "https://api.mailgun.net/v3/" + this.mailgunUrl + "/messages",
            body: "from=medicalmasterapp@gmail.com&to=" + recipient + "&subject=" + subject + "&text= Su contraseña es. "+ message+`&html= <!doctype html>
`,
     headers: this.requestHeaders
        }))
        .subscribe(success => {
            console.log("SUCCESS -> " + JSON.stringify(success));
              let alert = this.alertCtrl.create({
              title: 'Enviò Exitoso',
              subTitle: 'Infraccion enviada correctamente',
              buttons: ['ok']
              });
          alert.present();
          setTimeout(()=>{
      loader.dismiss();
    },2000)

        }, error => {
          loader.dismiss();
            console.log("ERROR -> " + JSON.stringify(error));
            let alert = this.alertCtrl.create({
              title: 'ERROR',
              subTitle: 'Ha ocurrido un error al intentar Enviar Infraccion, Porfavor intente nuevamente o verifique conexion.',
              buttons: ['ok']
              });
          alert.present();
        });
  }
    /*perfil(){
      let url = URL_SERVICIOS + "infractorapi/" + this.data;//ES LA URL DE LA API
//CONSUMIMOS EL SERVICIO DE LA API
     this.http.get( url )
         .map( resp => resp.json() )
         .subscribe( (data_resp) =>{
           console.log(data_resp);
           this.mydata = data_resp;
           console.log("mydata: ", this.mydata);
            console.log("nombre: ", this.mydata.infractor.nombre);
    }*/
}
