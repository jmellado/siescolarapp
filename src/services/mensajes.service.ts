import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

//importamos los orepaddores de reacti necesarios para realizar la peticiones con el protocolo HTTP
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
//import 'rxjs/add/operator/timeout';


@Injectable()
export class MensajesService {

	private options;

	//private url = 'http://192.168.0.4:80/siescolarappservicios/index.php/Mensajes_controller/';
	//private url = 'http://localhost:80/siescolarappservicios/index.php/Mensajes_controller/';
	private url = 'http://app.siescolar.online/index.php/mensajes_controller/';


	constructor(private http:Http) {

		let headers = new Headers({'Content-Type':'application/json'});
		this.options = new RequestOptions({headers: headers});

	}


	getMensajes(persona): Observable<any> {
		
		let url = `${this.url}`;
		let iJson = JSON.stringify(persona);
		return this.http.post(url+'index',iJson, this.options)
				   .map(r => r.json())
				   .catch(this.catchError)
		
	}


	getMensaje(idNotificacion): Observable<any> {
		
		let url = `${this.url}`;
		let iJson = JSON.stringify(idNotificacion);
		return this.http.post(url+'detalle_mensaje',iJson, this.options)
				   .map(r => r.json())
				   .catch(this.catchError) 
		
	}


	private catchError(error: Response | any){

		//console.log(error);
		return Observable.throw(error.json().error || "ServerError");
	}



}