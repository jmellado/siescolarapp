import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Servicios
import {EventosService} from '../../services/eventos.service';

/**
 * Generated class for the DetalleeventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalleevento',
  templateUrl: 'detalleevento.html',
})
export class DetalleeventoPage {

	evento : any;

	constructor(public navCtrl: NavController, public navParams: NavParams, private eventosservice: EventosService) {

		let id_notificacion = this.navParams.get('id_notificacion');
		this.cargarDetalleEvento(id_notificacion);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad DetalleeventoPage');
	}


	cargarDetalleEvento(id_notificacion){

		let idNotificacion = {id_notificacion:id_notificacion};

	  	this.eventosservice.getEvento(idNotificacion)
	  		.subscribe(
	  			rs => this.evento = rs[0],
	  			er => console.log(er),
	  			() => console.log(this.evento)

	  		)

	}

}
