import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Servicios
import {AcudidosService} from '../../services/acudidos.service';

//Modulos
import { Storage } from '@ionic/storage';

//Paginas
import { AsignaturasPage } from '../../pages/asignaturas/asignaturas';

@IonicPage()
@Component({
  selector: 'page-notas',
  templateUrl: 'notas.html',
})
export class NotasPage {

	session: any;
	id_persona: string;
	respuesta:any;
	listaacudidos : any;
	errormensaje: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage, private acudidosservice: AcudidosService) {
		this.mostrar_acudidos();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad NotasPage');
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

		this.navCtrl.push(AsignaturasPage, {id_estudiante:acudido.id_estudiante});
		
	}

}
