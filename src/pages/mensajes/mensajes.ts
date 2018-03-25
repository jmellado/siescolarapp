import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Servicios
import {MensajesService} from '../../services/mensajes.service';

//Modulos
import { Storage } from '@ionic/storage';

//Paginas
import { DetallemensajePage } from '../../pages/detallemensaje/detallemensaje';

/**
 * Generated class for the MensajesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mensajes',
  templateUrl: 'mensajes.html',
})
export class MensajesPage {

	listamensajes : any;
	session: any;
	id_persona: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, private mensajesservice: MensajesService, private storage:Storage) {

		this.mostrar_mensajes();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MensajesPage');
	}


	mostrar_mensajes(){

		this.storage.get('session').then((val) =>{

	        if(val !=null && val !=undefined){

		        this.session = JSON.parse(val);
		        this.id_persona = this.session.id_persona;

		        let persona = {id_persona:this.id_persona};

		        this.mensajesservice.getMensajes(persona)
			  		.subscribe(
			  			rs => this.listamensajes = rs,
			  			er => console.log(er),
			  			() => console.log(this.listamensajes)
			  		)
		        
		        
		    }
	        
	    });

	  	
	}


	detalle_mensaje(mensaje){

		this.navCtrl.push(DetallemensajePage, {id_notificacion:mensaje.id_notificacion});

	}

}
