import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

//importamos los orepaddores de reacti necesarios para realizar la peticiones con el protocolo HTTP
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeout';


@Injectable()
export class LoginService {

	private options;

	//private url = 'http://192.168.0.4:80/siescolarappservicios/index.php/Login_controller/';
	//private url = 'http://localhost:80/siescolarappservicios/index.php/Login_controller/';
	private url = 'http://app.siescolar.online/index.php/login_controller/';

	//userName: string;
	loggedIn: boolean;

	constructor(private http:Http, private storage:Storage, private events: Events) {

		let headers = new Headers({'Content-Type':'application/json'});
		this.options = new RequestOptions({headers: headers})

	}


	login(userInfo){

		let url = `${this.url}`;
		let iJson = JSON.stringify(userInfo);
		return this.http.post(url+'login_user',iJson, this.options)
		                .timeout(5000)
						.map(response => response.text())
						.map(response => {

							if (response == "usuarionoexiste" || response == "nofound") {
								
								this.loggedIn = false;
							}
							else{
								
								this.storage.set('session', response);
								//this.userName = userInfo.username;
								this.events.publish('usuario', response);
								this.loggedIn = true;
							}

							return this.loggedIn;

						})
						.catch(this.catchError)

	}


	logout(): void {
		
		this.storage.remove('session');
		//this.userName = '';
		this.loggedIn = false;
	}


	isLoggedIn(){
		return this.loggedIn;
	}


	registrarToken(PersonaToken): Observable<any> {
		
		let url = `${this.url}`;
		let iJson = JSON.stringify(PersonaToken);
		return this.http.post(url+'registrar_token',iJson, this.options)
				   .map(r => r.text()) 
		
	}


	private catchError(error: Response | any){

		//console.log(error);
		return Observable.throw(error.json().error || "ServerError");
	}


}