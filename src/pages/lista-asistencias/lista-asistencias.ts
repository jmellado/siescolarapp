import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Servicios
import {AsistenciasService} from '../../services/asistencias.service';

@IonicPage()
@Component({
  selector: 'page-lista-asistencias',
  templateUrl: 'lista-asistencias.html',
})
export class ListaAsistenciasPage {

	listaasistencias : any;
	errormensaje: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, private asistenciasservice: AsistenciasService) {

		let id_asignatura = this.navParams.get('id_asignatura');
		let id_estudiante = this.navParams.get('id_estudiante');
		this.mostrar_asistencias(id_asignatura,id_estudiante);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ListaAsistenciasPage');
	}


	mostrar_asistencias(id_asignatura,id_estudiante){

		let idAsigEst = {id_asignatura:id_asignatura,id_estudiante:id_estudiante};

	  	this.asistenciasservice.getAsistencias(idAsigEst)
	  		.subscribe(
	  			rs => this.listaasistencias = rs,
	  			//er => console.log(er),
	  			er => this.errormensaje = 'ServerError',
	  			() => console.log(this.listaasistencias)

	  		)

	}

}
