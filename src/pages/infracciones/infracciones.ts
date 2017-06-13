import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

//import { InfraccionesService } from '../../providers/infracciones';
import { URL_SERVICIOS } from '../../config/url.services';




@Component({
  selector: 'page-infracciones',
  templateUrl: 'infracciones.html',
})
export class InfraccionesPage {

infraccion:any []= [];
resultado:any []= [];
data:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http ) {

    console.log("dato recibido:", navParams);
    this.data = this.navParams.get('ID');
    this.cargartodos();
   /* this.data  = this.navParams.get("ID")
    console.log(this.data);*/
  }
  cargartodos( ){

     let url = URL_SERVICIOS + "infracciones/" + this.data;

     this.http.get( url )
         .map( resp => resp.json() )
         .subscribe( data =>{
           console.log(data);

           if(data.error){
               console.log("error");
               console.log(data.error);
           }else{
             this.infraccion.push(data);
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


