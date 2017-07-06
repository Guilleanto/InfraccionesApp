import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

//import { InfraccionesService } from '../../providers/infracciones';
import { URL_SERVICIOS } from '../../config/url.services';
import {AlertController} from "ionic-angular";
import { Storage } from "@ionic/storage";

import {HomePage} from "../home/home";
import {NuevainfraccionPage} from "../nuevainfraccion/nuevainfraccion";
import {CreatePage} from "../create/create";
import { DetailPage } from '../detail/detail';

import { UsuarioService } from "../../providers/registrar";
import { InfraccionesService } from '../../providers/infracciones';



@Component({
  selector: 'page-infracciones',
  templateUrl: 'infracciones.html',
})
export class InfraccionesPage {
//DECLARAMOS LAS VARIABLES
infraccion:any;
infracciondata:any [] = [];
resultado:any []= [];
data:any = {};
infractor_id:any;
cedula: any;
private mydata: any;
//CREAMOS EL CONSTRUCTOR
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http, public alertCtrl: AlertController, private _is: InfraccionesService,
    public loadCtrl: LoadingController, public storage:Storage, private _us: UsuarioService ) {


    console.log("dato recibido:", navParams);
    this.data = this.navParams.get('ID');

   /* this.data  = this.navParams.get("ID")
    console.log(this.data);*/
  }
ionViewWillEnter(){
  this.cargartodos();
}
  //CREAMOS LA FUNCION DE CARGAR DATOS
  cargartodos( ){
    this.cedula =  localStorage.getItem("cedula_infractor");
    this.cedula = this.storage.get("cedula_infractor");
    console.log("Buscando cedula:", this.cedula);
    let loader = this.loadCtrl.create({
          content:"Buscando...",
      });
    loader.present();
     let url = URL_SERVICIOS + "infractorapi/" + this.data;//ES LA URL DE LA API
//CONSUMIMOS EL SERVICIO DE LA API
     this.http.get( url )
         .map( resp => resp.json() )
         .subscribe( (data_resp) =>{
           console.log(data_resp);
           this.mydata = data_resp;
           console.log("mydata: ", this.mydata);
            console.log("nombre: ", this.mydata.infractor.id);

            this.storage.set('cedula', this.mydata.infractor.cedula );
            this.storage.set('infractor_id', this.mydata.infractor.id );
            localStorage.setItem("cedula", this.mydata.infractor.cedula);
            localStorage.setItem("infractor_id", this.mydata.infractor.id);

           if(this.mydata.status_code == "500"){//SI HAY ERROR
                     loader.dismiss();
                     let alert = this.alertCtrl.create({
                            title: "Error",
                            subTitle: "Error 500",
                            buttons: ["OK"],
                          });
                     alert.present();

           }else{//SI TODO ANDA BIEN
                 if( this.mydata.infraccion_t < 1 ){//COMPARAMOS SI HAY EL INFRACTOR TIENE MAS DE 1 INFRACCION SI TIENE MENOS DE UNA NO TIENE
                   loader.dismiss();
                    let alert = this.alertCtrl.create({
                            title: "El Infractor no tiene Infracciones",
                            subTitle: "¿Desea Registrar una nueva infracción?",
                            buttons: [
                              {
                                text:"Si",
                                handler: ()=>{

                                    this.navCtrl.push(NuevainfraccionPage);
                                }
                              },
                              {
                                text: 'No',
                                role: 'cancel',
                                handler: () => {

                                  this.navCtrl.setRoot(HomePage);
                              }
                                  }
                            ]
                          });
                 alert.present()
             }else{
                  console.log(this.mydata);//SI TIENE INFRACCION SE CARGA EL DATO EN UN ARRAY PARA MOSTRAR
                  console.log(this.mydata.infractor.id)
                  console.log(this.mydata.infraccion);
                    this.infraccion = this.mydata.infraccion;
                    console.log(this.infraccion);
                    loader.dismiss();
             }



           }

         }, error =>{ //SI NO ESTA REGISTRADO EL INFRACTOR
               loader.dismiss();
               let alert = this.alertCtrl.create({
                            title: "Esta Cedula No esta registrada",
                            subTitle: "desea Registrar nuevo Infractor?",
                            buttons: [
                              {
                                text:"Si",
                                handler: ()=>{

                                    this.navCtrl.push(CreatePage);
                                }
                              },
                              {
                                text: 'No',
                                role: 'cancel',
                                handler: () => {

                                  this.navCtrl.setRoot(HomePage);
                              }
                                  }
                            ]
                          });
                 alert.present()
         })

     }
     detail(item){
       this.navCtrl.push(DetailPage, { "detail": item});
     }
     Enviar(){

       let recipient = "correo";// storage correo
    let subject = "Infraccion";
    let message = "" ;
       this._us.EnviarEmail(recipient,subject,message);
     }
      nuevaInfraccion(){
      this.navCtrl.push(NuevainfraccionPage);
    }

  }


