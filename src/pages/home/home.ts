import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//Servicios
import {LoginService} from '../../services/login.service';

//Paginas
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	constructor(public navCtrl: NavController, private loginservice: LoginService) {

	}


  	logout(){

	  	this.loginservice.logout();
	  	this.navCtrl.setRoot(LoginPage);
	}

}
