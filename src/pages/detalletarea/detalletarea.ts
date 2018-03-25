import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Servicios
import {TareasService} from '../../services/tareas.service';

/**
 * Generated class for the DetalletareaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalletarea',
  templateUrl: 'detalletarea.html',
})
export class DetalletareaPage {

	tarea : any;

	constructor(public navCtrl: NavController, public navParams: NavParams, private tareasservice: TareasService) {

		let id_notificacion = this.navParams.get('id_notificacion');
		this.cargarDetalleTarea(id_notificacion);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad DetalletareaPage');
	}


	cargarDetalleTarea(id_notificacion){

		let idNotificacion = {id_notificacion:id_notificacion};

	  	this.tareasservice.getTarea(idNotificacion)
	  		.subscribe(
	  			rs => this.tarea = rs[0],
	  			er => console.log(er),
	  			() => console.log(this.tarea)

	  		)

	}

}
