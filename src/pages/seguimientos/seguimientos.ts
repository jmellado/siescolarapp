import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Servicios
import {SeguimientosService} from '../../services/seguimientos.service';

//Modulos
import { Storage } from '@ionic/storage';

//Paginas
import { DetalleseguimientoPage } from '../../pages/detalleseguimiento/detalleseguimiento';

@IonicPage()
@Component({
  selector: 'page-seguimientos',
  templateUrl: 'seguimientos.html',
})
export class SeguimientosPage {

	listaseguimientos : any;
	session: any;
	id_persona: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, private seguimientosservice: SeguimientosService, private storage:Storage) {

		this.mostrar_seguimientos();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SeguimientosPage');
	}


	mostrar_seguimientos(){

		this.storage.get('session').then((val) =>{

	        if(val !=null && val !=undefined){

		        this.session = JSON.parse(val);
		        this.id_persona = this.session.id_persona;

		        let persona = {id_persona:this.id_persona};

		        this.seguimientosservice.getSeguimientos(persona)
			  		.subscribe(
			  			rs => this.listaseguimientos = rs,
			  			er => console.log(er),
			  			() => console.log(this.listaseguimientos)
			  		)
		        
		        
		    }
	        
	    });

	  	
	}


	detalle_seguimiento(seguimiento){

		this.navCtrl.push(DetalleseguimientoPage, {id_seguimiento:seguimiento.id_seguimiento});

	}

}
