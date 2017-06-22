import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

//import { InfraccionesService } from '../../providers/infracciones';
import { URL_SERVICIOS } from '../../config/url.services';
import {AlertController} from "ionic-angular";

import {HomePage} from "../home/home";
import {NuevainfraccionPage} from "../nuevainfraccion/nuevainfraccion";
import {CreatePage} from "../create/create";





@Component({
  selector: 'page-infracciones',
  templateUrl: 'infracciones.html',
})
export class InfraccionesPage {

infraccion:any []= [];
infracciondata:any [] = [];
resultado:any []= [];
data:any = {};
private mydata: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http, public alertCtrl: AlertController ) {

    console.log("dato recibido:", navParams);
    this.data = this.navParams.get('ID');
    this.cargartodos();
   /* this.data  = this.navParams.get("ID")
    console.log(this.data);*/
  }
  cargartodos( ){

     let url = URL_SERVICIOS + "infractorapi/" + this.data;

     this.http.get( url )
         .map( resp => resp.json() )
         .subscribe( (data_resp) =>{
           console.log(data_resp);
           this.mydata = data_resp;
           console.log("mydata: ", this.mydata);
            console.log("nombre: ", this.mydata.infractor.nombre);
           if(data_resp.error){

           }else{
                 if( this.mydata.infraccion < 1 ){
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
                  console.log(this.mydata);
                  console.log(this.mydata.infractor.nombre)
                    this.infraccion.push(this.mydata);

             }



           }

         }, error =>{
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

    buscar_infraccion(id:any ) {
         let url = URL_SERVICIOS + "infracciones" + id;

         this.http.get( url )
               .subscribe (resp =>{
                 let data = resp.json();
                 this.resultado = data.id;
                 console.log(this.resultado)

               });
       }


  }


