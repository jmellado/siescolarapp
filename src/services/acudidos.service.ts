import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

//importamos los orepaddores de reacti necesarios para realizar la peticiones con el protocolo HTTP
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';



@Injectable()
export class AcudidosService {

	private options;

	private url = 'http://192.168.0.4:80/siescolarappservicios/index.php/Acudidos_controller/';
	//private url = 'http://localhost:80/siescolarappservicios/index.php/Login_controller/';
	//private url = 'http://app.siescolar.xyz/index.php/login_controller/';

	
	constructor(private http:Http, private storage:Storage) {

		let headers = new Headers({'Content-Type':'application/json'});
		this.options = new RequestOptions({headers: headers})

	}


	getAcudidos(persona): Observable<any> {
		
		let url = `${this.url}`;
		let iJson = JSON.stringify(persona);
		return this.http.post(url+'index',iJson, this.options)
				   .map(r => r.json()) 
		
	}


}