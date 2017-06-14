import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UsuarioService } from "../../providers/registrar";

@IonicPage()
@Component({
  selector: 'page-nuevainfraccion',
  templateUrl: 'nuevainfraccion.html',
})
export class NuevainfraccionPage {


id:string="";
infractor_id:string="1";
fecha:string="";
hora:string="";
lugar:string="";
tipo_vehiculo:string="";
modelo_vehiculo:string="";
placa_vehiculo:string="";
color_vehiculo:string="";
serial_vehiculo:string="";
retuvo_vehiculo:string="";
id_articulo:string="";
retuvo_licencia:string="";
importe_pagar:string="";
ano_vehiculo:string="";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _us:UsuarioService) {
  }

  registrar() {
      this._us.registrar(this.id, this.infractor_id, this.fecha, this.hora, this.lugar, this.tipo_vehiculo,
        this.modelo_vehiculo, this.placa_vehiculo, this.color_vehiculo, this.serial_vehiculo,
        this.retuvo_licencia, this.id_articulo, this.retuvo_licencia, this.importe_pagar, this.ano_vehiculo).subscribe( ()=>{
      })


  }

}
