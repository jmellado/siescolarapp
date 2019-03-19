import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Servicios
import {TareasService} from '../../services/tareas.service';

//Modulos
import { Storage } from '@ionic/storage';

//Paginas
import { DetalletareaPage } from '../../pages/detalletarea/detalletarea';

/**
 * Generated class for the TareasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tareas',
  templateUrl: 'tareas.html',
})
export class TareasPage {

	listatareas : any;
	session: any;
	id_persona: string;
	errormensaje: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, private tareasservice: TareasService, private storage:Storage) {

		this.mostrar_tareas();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad TareasPage');
	}


	mostrar_tareas(){

		this.storage.get('session').then((val) =>{

	        if(val !=null && val !=undefined){

		        this.session = JSON.parse(val);
		        this.id_persona = this.session.id_persona;

		        let persona = {id_persona:this.id_persona};

		        this.tareasservice.getTareas(persona)
			  		.subscribe(
			  			rs => this.listatareas = rs,
			  			//er => console.log(er),
			  			er => this.errormensaje = 'ServerError',
			  			() => console.log(this.listatareas)
			  		)
		        
		        
		    }
	        
	    });

	  	
	}


	detalle_tarea(tarea){

		this.navCtrl.push(DetalletareaPage, {id_notificacion:tarea.id_notificacion});

	}

}
