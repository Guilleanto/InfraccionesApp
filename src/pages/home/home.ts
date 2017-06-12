import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { InfraccionesService } from '../../providers/infracciones';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
               private _ps: InfraccionesService ) {

  }

  /*getdata(){
    this._ps.cargartodos().then((data)=>{

      if(data){
        console.log('Correcto');
      }else{
        console.log('Error');
      }
    })
  }*/

}
