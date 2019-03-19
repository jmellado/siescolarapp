import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//Servicios
import {LoginService} from '../../services/login.service';
import {AcudidosService} from '../../services/acudidos.service';

//Paginas
import { LoginPage } from '../../pages/login/login';

//Modulos
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	session: any;
	id_persona: string;
	respuesta:any;
	listaacudidos : any;
	errormensaje: string;

	constructor(public navCtrl: NavController,private push: Push, private loginservice: LoginService, private storage:Storage, private acudidosservice: AcudidosService, public alertCtrl: AlertController) {

		// to check if we have permission
		this.push.hasPermission()
		  	.then((res: any) => {

		    if (res.isEnabled) {
		    	//alert('Tiene Permisos');

		    	// to initialize push notifications
				const options: PushOptions = {
				   android: {
				   	   senderID: ''
				   },
				   ios: {
				       alert: 'true',
				       badge: true,
				       sound: 'false'
				   },
				   windows: {},
				   browser: {
				       pushServiceURL: 'http://push.api.phonegap.com/v1/push'
				   }
				};

				const pushObject: PushObject = this.push.init(options);

				pushObject.on('notification').subscribe((notification: any) => {
					//console.log('Received a notification', notification)
					//alert(notification.message);
					this.showAlert(notification.title,notification.message);
				});

				pushObject.on('registration').subscribe((registration: any) => {
					//console.log('Device registered', registration)
					//alert(registration.registrationId.toString());
					this.registrar_token(registration.registrationId.toString());
				});

				pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

		    } else {
		    	alert('No Tiene Permisos');
		    }

		});

		this.cargar_session();
		this.mostrar_acudidos();  	

	}


  	logout(){

	  	this.loginservice.logout();
	  	this.navCtrl.setRoot(LoginPage);
	}


	registrar_token(token){

		this.storage.get('session').then((val) =>{
			
	        if(val !=null && val !=undefined){

		        this.session = JSON.parse(val);
		        this.id_persona = this.session.id_persona;

		        let PersonaToken = {id_persona:this.id_persona, token:token};
		        //alert(JSON.stringify(PersonaToken));
		        this.loginservice.registrarToken(PersonaToken)
			  		.subscribe(
			  			rs => this.respuesta = rs,
			  			er => console.log(er),
			  			() => console.log(this.respuesta)
			  		)
		        
		        
		    }
	        
	    });

	}


	cargar_session(){

		this.storage.get('session').then((val) =>{

			if(val !=null && val !=undefined){

				this.session = JSON.parse(val);

			}
		});

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


	showAlert(titulo,mensaje){

		let alert = this.alertCtrl.create({

			title: titulo,
      		subTitle: mensaje,
      		buttons: ['OK']

		});

		alert.present();
	}

}
