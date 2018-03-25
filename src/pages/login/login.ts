import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Servicios
import {LoginService} from '../../services/login.service';

//Paginas
import {HomePage} from '../home/home';

//Modulos
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	username: string;
	password: string;
	isLogged: boolean;
	session : any;
	logueado: boolean;

	constructor(public navCtrl: NavController, public navParams: NavParams, private loginservice: LoginService, public alertCtrl: AlertController, private storage: Storage) {
		this.verificarlogin();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}


	login(){

		let formlogin = {username:this.username, password:this.password};
		//console.log(this.username);
		this.loginservice.login(formlogin)
			.subscribe(

				rs => this.isLogged = rs,
				er => console.log(er),
				() => {

					if (this.isLogged) {
						
						this.navCtrl.setRoot(HomePage)
						.then(

							data => console.log(data),
							error => console.log(error)

						);
					}
					else{
						//console.log('Usuario o Contraseña Incorrectos');
						this.showAlert('Usuario o Contraseña Incorrectos.');
					}
				}

			) 

	}


	logout(){

	  	this.loginservice.logout();
	  	this.navCtrl.setRoot(LoginPage);
	}


	showAlert(mensaje){

		let alert = this.alertCtrl.create({

			title: 'Información',
      		subTitle: mensaje,
      		buttons: ['OK']

		});

		alert.present();
	}


	verificarlogin(){

		this.storage.get('session').then((val) =>{

	        if(val !=null && val !=undefined){

		        this.session = JSON.parse(val);
		        this.logueado = this.session.logueado;
		        //console.log(this.logueado);
		        if (this.logueado) {
		        	this.navCtrl.setRoot(HomePage);
		        }
		        
		    }
	        
	    });
	}


}