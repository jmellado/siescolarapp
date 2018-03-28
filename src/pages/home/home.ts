import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//Modulos
import { Push, PushObject, PushOptions } from '@ionic-native/push';

//Servicios
import {LoginService} from '../../services/login.service';

//Paginas
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	constructor(public navCtrl: NavController, private loginservice: LoginService, private push: Push) {

		// to check if we have permission
		this.push.hasPermission()
			.then((res: any) => {

				if (res.isEnabled) {
			  		console.log('tiene permisos para enviar notificaciones push');

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
						alert(notification.message);
					});

					pushObject.on('registration').subscribe((registration: any) => {

						//console.log('Device registered', registration)
						alert(registration.registrationId.toString());
					});

					pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

				} else {
			  		console.log('no tiene permiso');
				}

			});

	}


  	logout(){

	  	this.loginservice.logout();
	  	this.navCtrl.setRoot(LoginPage);
	}

}
