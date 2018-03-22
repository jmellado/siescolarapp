import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Servicios
import {MensajesService} from '../../services/mensajes.service';

/**
 * Generated class for the MensajesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mensajes',
  templateUrl: 'mensajes.html',
})
export class MensajesPage {

	listamensajes : any;

	constructor(public navCtrl: NavController, public navParams: NavParams, private mensajesservice: MensajesService) {

		this.mostrar_mensajes();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MensajesPage');
	}


	mostrar_mensajes(){

	  	this.mensajesservice.getMensajes()
	  		.subscribe(
	  			rs => this.listamensajes = rs,
	  			er => console.log(er),
	  			() => console.log(this.listamensajes)
	  		)
	}

}
