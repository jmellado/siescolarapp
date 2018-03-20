import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

//importamos los orepaddores de reacti necesarios para realizar la peticiones con el protocolo HTTP
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';



@Injectable()
export class LoginService {

	private options;

	//private url = 'http://192.168.0.9:80/siescolarappservicios/index.php/Login_controller/';
	private url = 'http://localhost:80/siescolarappservicios/index.php/Login_controller/';

	//userName: string;
	loggedIn: boolean;

	constructor(private http:Http, private storage:Storage) {

		let headers = new Headers({'Content-Type':'application/json'});
		this.options = new RequestOptions({headers: headers})

	}


	login(userInfo){

		let url = `${this.url}`;
		let iJson = JSON.stringify(userInfo);
		return this.http.post(url+'login_user',iJson, this.options)
						.map(response => response.text())
						.map(response => {

							if (response == "usuarionoexiste" || response == "nofound") {
								
								this.loggedIn = false;
							}
							else{
								
								this.storage.set('session', response);
								//this.userName = userInfo.username;
								this.loggedIn = true;
							}

							return this.loggedIn;

						});

	}


	logout(): void {
		
		this.storage.remove('session');
		//this.userName = '';
		this.loggedIn = false;
	}


	isLoggedIn(){
		return this.loggedIn;
	}


}