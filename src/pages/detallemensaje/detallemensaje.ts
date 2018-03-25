import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Servicios
import {MensajesService} from '../../services/mensajes.service';

/**
 * Generated class for the DetallemensajePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detallemensaje',
  templateUrl: 'detallemensaje.html',
})
export class DetallemensajePage {

	mensaje : any;

	constructor(public navCtrl: NavController, public navParams: NavParams, private mensajesservice: MensajesService) {

		let id_notificacion = this.navParams.get('id_notificacion');
		this.cargarDetalleMensaje(id_notificacion);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad DetallemensajePage');
	}


	cargarDetalleMensaje(id_notificacion){

		let idNotificacion = {id_notificacion:id_notificacion};

	  	this.mensajesservice.getMensaje(idNotificacion)
	  		.subscribe(
	  			rs => this.mensaje = rs[0],
	  			er => console.log(er),
	  			() => console.log(this.mensaje)

	  		)

	}

}
