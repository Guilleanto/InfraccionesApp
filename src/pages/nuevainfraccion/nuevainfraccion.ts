import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import {HomePage} from "../home/home";
import {InfraccionesPage} from "../infracciones/infracciones";
import { Http } from '@angular/http';
import { UsuarioService } from "../../providers/registrar"
import { Storage } from "@ionic/storage";
import { URL_SERVICIOS } from '../../config/url.services';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

@Component({
  selector: 'page-nuevainfraccion',
  templateUrl: 'nuevainfraccion.html',
})
export class NuevainfraccionPage {

titulo:string="";
imgPreview:string = null;
img:string = null;



infractor_id:any;//PILAS CON ESTO SE DEBE CAMBIAR AL ID DEL INSFRACCTOR
//fecha:string="";
fecha: string = new Date().toISOString();
hora:string="";
lugar:string="";
tipo_vehiculo:string="";
modelo_vehiculo:string="";
ano_vehiculo:string="";
placa_vehiculo:string="";
color_vehiculo:string="";
retuvo_vehiculo:string="";
id_articulo:string="";
retuvo_licencia:string="";
importe_pagar:string="";
numerales:any = "";

private arti: any;
private ar:any;
cedula:any;
//articulos:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _us:UsuarioService, public http: Http, private storage: Storage, private platform: Platform, private image:ImagePicker, private toastCtrol: ToastController) {
this.cargar_articulos();
console.log(this.fecha);


  }

  registrar() {



    this.infractor_id =  localStorage.getItem("infractor_id");
      this._us.registrar(this.infractor_id, this.fecha, this.hora, this.lugar, this.tipo_vehiculo,
        this.modelo_vehiculo, this.ano_vehiculo, this.placa_vehiculo, this.color_vehiculo, this.retuvo_vehiculo,
         this.id_articulo, this.retuvo_licencia, this.importe_pagar, this.numerales).subscribe( ()=>{
      })
       this.navCtrl.setRoot(HomePage);


  }
updateSelectedValue(event: any){
    this.id_articulo = JSON.parse(event);
    console.log(this.id_articulo);

    let url = URL_SERVICIOS + 'articulos/' + this.id_articulo;
    this.http.get( url )
         .map( resp => resp.json() )
         .subscribe( (data_resp) =>{
           console.log(data_resp);
           this.ar = data_resp;
           console.log(this.ar.descripcion);
           //this.articulos = this.mydata.infraccion;
         },error =>{
           console.log('ERROR');

         });
  }

cargar_articulos(){
    let url = URL_SERVICIOS + 'articulos';
      this.http.get( url )
         .map( resp => resp.json() )
         .subscribe( (data_resp) =>{
           console.log(data_resp);
           this.arti = data_resp;
           console.log(this.arti);
           //this.articulos = this.mydata.infraccion;
         },error =>{
           console.log('ERROR');

         });
}
  private mostrar_toast(texto:string){
    this.toastCtrol.create({
      message: texto,
      duration: 2500
    }).present();
  }

  Seleccionar(){
    if(!this.platform.is("cordova")){
      this.mostrar_toast('no estas en un dispositivo');
      return;
    }

    let options: ImagePickerOptions = {
        maximumImagesCount: 1,
        quality: 40,
        outputType: 1
    }
this.image.getPictures(options).then((results) => {

      for (let img of results){
        this.imgPreview = 'data/:image/jpeg;base64,' + img
        this.img = img;
        break;
      }

        for (var i = 0; i < results.length; i++) {


            console.log('Image URI: ' + results[i]);

            break;
        }
      }, (err) => {
          this.mostrar_toast("Error seleccion");
          console.error( "error en seleccion: " + JSON.stringify(err) );
      });
        }

}
