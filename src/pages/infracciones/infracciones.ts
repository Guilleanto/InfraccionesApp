import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

//import { InfraccionesService } from '../../providers/infracciones';
import { URL_SERVICIOS } from '../../config/url.services';
import {AlertController} from "ionic-angular";

import {HomePage} from "../home/home";
import {NuevainfraccionPage} from "../nuevainfraccion/nuevainfraccion";





@Component({
  selector: 'page-infracciones',
  templateUrl: 'infracciones.html',
})
export class InfraccionesPage {

infraccion:any []= [];
infracciondata:any [] = [];
resultado:any []= [];
data:any = {};

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
         .subscribe( data =>{
           console.log(data);

           if(data.error){
               let alert = this.alertCtrl.create({
                            title: "No Hay Registro",
                            subTitle: "desea Registrar nuevo Infractor?",
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
             this.infraccion.push(data[0]);
             console.log(this.infraccion);
           }

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


