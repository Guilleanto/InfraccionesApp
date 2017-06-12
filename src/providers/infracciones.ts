import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { URL_SERVICIOS } from '../config/url.services';


@Injectable()
export class InfraccionesService {

infraccion:any []= [];
resultado:any []= [];

  constructor(public http: Http) {

    //solo se cargara una vez
  }
  ionViewDidEnter(){

  }
   /*cargartodos( ){

     let url = URL_SERVICIOS + "infracciones/1";

     this.http.get( url )
         .map( resp => resp.json() )
         .subscribe( data =>{
           console.log(data);

           if(data.error){
               console.log("error");
           }else{
             this.infraccion.push(data);
             console.log(this.infraccion);
           }

         })

     }*/

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



