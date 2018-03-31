import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//Servicios
import {LoginService} from '../../services/login.service';

//Paginas
import { LoginPage } from '../../pages/login/login';

//Modulos
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	constructor(public navCtrl: NavController,private push: Push, private loginservice: LoginService) {

		// to check if we have permission
		this.push.hasPermission()
		  	.then((res: any) => {

		    if (res.isEnabled) {
		    	alert('Tiene Permisos');

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

				pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

				pushObject.on('registration').subscribe((registration: any) => {
					//console.log('Device registered', registration)
					alert(registration.registrationId.toString());
				});

				pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

		    } else {
		    	alert('No Tiene Permisos');
		    }

		});

	}


  	logout(){

	  	this.loginservice.logout();
	  	this.navCtrl.setRoot(LoginPage);
	}

}
