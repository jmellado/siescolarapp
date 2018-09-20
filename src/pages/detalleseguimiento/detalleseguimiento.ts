import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Servicios
import {SeguimientosService} from '../../services/seguimientos.service';

/**
 * Generated class for the DetalleseguimientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalleseguimiento',
  templateUrl: 'detalleseguimiento.html',
})
export class DetalleseguimientoPage {

	seguimiento : any;

	constructor(public navCtrl: NavController, public navParams: NavParams, private seguimientosservice: SeguimientosService) {

		let id_seguimiento = this.navParams.get('id_seguimiento');
		this.cargarDetalleSeguimiento(id_seguimiento);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad DetalleseguimientoPage');
	}


	cargarDetalleSeguimiento(id_seguimiento){

		let idSeguimiento = {id_seguimiento:id_seguimiento};

	  	this.seguimientosservice.getSeguimiento(idSeguimiento)
	  		.subscribe(
	  			rs => this.seguimiento = rs[0],
	  			er => console.log(er),
	  			() => console.log(this.seguimiento)

	  		)

	}

}
