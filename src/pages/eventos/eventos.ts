import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Servicios
import {EventosService} from '../../services/eventos.service';

//Modulos
import { Storage } from '@ionic/storage';

//Paginas
import { DetalleeventoPage } from '../../pages/detalleevento/detalleevento';

/**
 * Generated class for the EventosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eventos',
  templateUrl: 'eventos.html',
})
export class EventosPage {

	listaeventos : any;
	session: any;
	id_persona: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, private eventosservice: EventosService, private storage:Storage) {

		this.mostrar_eventos();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad EventosPage');
	}


	mostrar_eventos(){

		this.storage.get('session').then((val) =>{

	        if(val !=null && val !=undefined){

		        this.session = JSON.parse(val);
		        this.id_persona = this.session.id_persona;

		        let persona = {id_persona:this.id_persona};

		        this.eventosservice.getEventos(persona)
			  		.subscribe(
			  			rs => this.listaeventos = rs,
			  			er => console.log(er),
			  			() => console.log(this.listaeventos)
			  		)
		        
		        
		    }
	        
	    });

	  	
	}


	detalle_evento(evento){

		this.navCtrl.push(DetalleeventoPage, {id_notificacion:evento.id_notificacion});

	}

}
