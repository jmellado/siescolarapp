import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Servicios
import {AsistenciasService} from '../../services/asistencias.service';

//Paginas
import { ListaAsistenciasPage } from '../../pages/lista-asistencias/lista-asistencias';

@IonicPage()
@Component({
  selector: 'page-asignaturas-asistencias',
  templateUrl: 'asignaturas-asistencias.html',
})
export class AsignaturasAsistenciasPage {

	listaasignaturas : any;
	errormensaje: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, private asistenciasservice: AsistenciasService) {

		let id_estudiante = this.navParams.get('id_estudiante');
		this.mostrar_asignaturas(id_estudiante);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AsignaturasAsistenciasPage');
	}

	mostrar_asignaturas(id_estudiante){

		let idEstudiante = {id_estudiante:id_estudiante};

	  	this.asistenciasservice.getAsignaturas(idEstudiante)
	  		.subscribe(
	  			rs => this.listaasignaturas = rs,
	  			//er => console.log(er),
	  			er => this.errormensaje = 'ServerError',
	  			() => console.log(this.listaasignaturas)

	  		)

	}


	consultar_lista_asistencias(asignatura){

		this.navCtrl.push(ListaAsistenciasPage, {id_asignatura:asignatura.id_asignatura,id_estudiante:asignatura.id_estudiante});
		
	}

}
