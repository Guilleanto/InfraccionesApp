import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import {HomePage} from "../home/home";
import {InfraccionesPage} from "../infracciones/infracciones";
import { UsuarioService } from "../../providers/registrar"
import { Storage } from "@ionic/storage";
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

@Component({
  selector: 'page-nuevainfraccion',
  templateUrl: 'nuevainfraccion.html',
})
export class NuevainfraccionPage {

titulo:string="";
imgPreview:string = null;
img:string = null;


id:string="";
infractor_id:any;//PILAS CON ESTO SE DEBE CAMBIAR AL ID DEL INSFRACCTOR
fecha:string="";
hora:string="";
lugar:string="";
tipo_vehiculo:string="";
modelo_vehiculo:string="";
ano_vehiculo:string="";
placa_vehiculo:string="";
color_vehiculo:string="";
serial_vehiculo:string="";
retuvo_vehiculo:string="";
id_articulo:string="";
retuvo_licencia:string="";
importe_pagar:string="";

cedula:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _us:UsuarioService,private storage: Storage, private platform: Platform, private image:ImagePicker, private toastCtrol: ToastController) {


  }

  registrar() {



    this.infractor_id =  localStorage.getItem("infractor_id");
      this._us.registrar(this.id, this.infractor_id, this.fecha, this.hora, this.lugar, this.tipo_vehiculo,
        this.modelo_vehiculo, this.ano_vehiculo, this.placa_vehiculo, this.color_vehiculo, this.serial_vehiculo,
        this.retuvo_vehiculo, this.id_articulo, this.retuvo_licencia, this.importe_pagar).subscribe( ()=>{
      })


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
