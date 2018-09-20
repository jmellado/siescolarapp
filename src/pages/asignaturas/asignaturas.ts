import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Servicios
import {NotasService} from '../../services/notas.service';

//Paginas
import { ActividadesPage } from '../../pages/actividades/actividades';

@IonicPage()
@Component({
  selector: 'page-asignaturas',
  templateUrl: 'asignaturas.html',
})
export class AsignaturasPage {

	listaasignaturas : any;

	constructor(public navCtrl: NavController, public navParams: NavParams, private notasservice: NotasService) {

		let id_estudiante = this.navParams.get('id_estudiante');
		this.mostrar_asignaturas(id_estudiante);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AsignaturasPage');
	}


	mostrar_asignaturas(id_estudiante){

		let idEstudiante = {id_estudiante:id_estudiante};

	  	this.notasservice.getAsignaturas(idEstudiante)
	  		.subscribe(
	  			rs => this.listaasignaturas = rs,
	  			er => console.log(er),
	  			() => console.log(this.listaasignaturas)

	  		)

	}


	consultar_actividades(asignatura){

		this.navCtrl.push(ActividadesPage, {id_asignatura:asignatura.id_asignatura,id_estudiante:asignatura.id_estudiante});
		
	}

}
