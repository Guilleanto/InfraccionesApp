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


    buscar_infraccion(cedula:any ) {
         let url = URL_SERVICIOS + "infractorapi/" + cedula;

         this.http.get( url )
               .subscribe (resp =>{
                 let data = resp.json();
                 this.resultado = data.id;
                 console.log(this.resultado)

               });
       }

  }



