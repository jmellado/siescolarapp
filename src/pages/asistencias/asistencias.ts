import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Servicios
import {AcudidosService} from '../../services/acudidos.service';

//Modulos
import { Storage } from '@ionic/storage';

//Paginas
import { AsignaturasAsistenciasPage } from '../../pages/asignaturas-asistencias/asignaturas-asistencias';

@IonicPage()
@Component({
  selector: 'page-asistencias',
  templateUrl: 'asistencias.html',
})
export class AsistenciasPage {

	session: any;
	id_persona: string;
	respuesta:any;
	listaacudidos : any;
	errormensaje: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage, private acudidosservice: AcudidosService) {
		this.mostrar_acudidos();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AsistenciasPage');
	}

	mostrar_acudidos(){

		this.storage.get('session').then((val) =>{

	        if(val !=null && val !=undefined){

		        this.session = JSON.parse(val);
		        this.id_persona = this.session.id_persona;

		        let persona = {id_persona:this.id_persona};

		        this.acudidosservice.getAcudidos(persona)
			  		.subscribe(
			  			rs => this.listaacudidos = rs,
			  			//er => console.log(er),
			  			er => this.errormensaje = 'ServerError',
			  			() => console.log(this.listaacudidos)
			  		)
		        
		        
		    }
	        
	    });

	  	
	}


	consultar_asignaturas(acudido){

		this.navCtrl.push(AsignaturasAsistenciasPage, {id_estudiante:acudido.id_estudiante});
		
	}

}
