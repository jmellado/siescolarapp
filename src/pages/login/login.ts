import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

//Servicios
import {LoginService} from '../../services/login.service';

//Paginas
import {HomePage} from '../home/home';

//Modulos
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';

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

	username: string = '';
	password: string = '';
	isLogged: boolean;
	session : any;
	logueado: boolean;
	errormensaje: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, private loginservice: LoginService, public alertCtrl: AlertController, private storage: Storage,private network: Network, private menuCtrl: MenuController) {
		//this.verificarlogin();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}


	login(){

		let formlogin = {username:this.username, password:this.password};
		//console.log(this.username);

		if (this.username !='' && this.password !='') {

			if (this.network.type != 'none') {
			
				this.loginservice.login(formlogin)
					.subscribe(

						rs => this.isLogged = rs,
						//er => console.log(er),
						er => this.showError(er),
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
								this.showAlert('Error al ingresar','Usuario o Contraseña Incorrectos.');
							}
						}

					)
					
			}
			else{
				this.showAlert('Error al ingresar','No se puede iniciar sesión. No hay conexión a una red en este momento.');
			}		
		}
		else{
			this.showAlert('Error','Ingresar Usuario y Contraseña.');
		}		 

	}


	logout(){

	  	this.loginservice.logout();
	  	this.navCtrl.setRoot(LoginPage);
	}


	showAlert(titulo,mensaje){

		let alert = this.alertCtrl.create({

			title: titulo,
      		subTitle: mensaje,
      		buttons: ['ACEPTAR']

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


	showError(error){

		let alert = this.alertCtrl.create({

			title: 'Error al ingresar',
      		subTitle: 'No se puede establecer una conexión con el servidor',
      		buttons: ['ACEPTAR']

		});

		alert.present();
	}


	//************ Hooks O Eventos De Pagina *****************

	// Se ejecuta cuando la página está a punto de ingresar y convertirse en la página activa.
	ionViewWillEnter() {
		this.menuCtrl.enable(false);	
	}

	// Se ejecuta cuando la página está por salir y ya no es la página activa.
	ionViewWillLeave() {
		this.menuCtrl.enable(true);
	}


}
