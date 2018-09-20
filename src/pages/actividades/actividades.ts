import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Servicios
import {NotasService} from '../../services/notas.service';

@IonicPage()
@Component({
  selector: 'page-actividades',
  templateUrl: 'actividades.html',
})
export class ActividadesPage {

	listaactividades : any;

	constructor(public navCtrl: NavController, public navParams: NavParams, private notasservice: NotasService) {

		let id_asignatura = this.navParams.get('id_asignatura');
		let id_estudiante = this.navParams.get('id_estudiante');
		this.mostrar_actividades(id_asignatura,id_estudiante);

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ActividadesPage');
	}


	mostrar_actividades(id_asignatura,id_estudiante){

		let idAsigEst = {id_asignatura:id_asignatura,id_estudiante:id_estudiante};

	  	this.notasservice.getActividades(idAsigEst)
	  		.subscribe(
	  			rs => this.listaactividades = rs,
	  			er => console.log(er),
	  			() => console.log(this.listaactividades)

	  		)

	}

}
