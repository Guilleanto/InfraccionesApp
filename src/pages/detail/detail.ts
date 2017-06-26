import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

infraccion:any= {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.get("detail"));

    this.infraccion = this.navParams.get("detail");
  }




}
