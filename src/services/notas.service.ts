import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

//importamos los orepaddores de reacti necesarios para realizar la peticiones con el protocolo HTTP
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';



@Injectable()
export class NotasService {

	private options;

	private url = 'http://192.168.0.4:80/siescolarappservicios/index.php/Notas_controller/';
	//private url = 'http://localhost:80/siescolarappservicios/index.php/Login_controller/';
	//private url = 'http://app.siescolar.xyz/index.php/login_controller/';

	
	constructor(private http:Http) {

		let headers = new Headers({'Content-Type':'application/json'});
		this.options = new RequestOptions({headers: headers})

	}


	getAsignaturas(idEstudiante): Observable<any> {
		
		let url = `${this.url}`;
		let iJson = JSON.stringify(idEstudiante);
		return this.http.post(url+'asignaturas',iJson, this.options)
				   .map(r => r.json()) 
		
	}


	getActividades(idAsigEst): Observable<any> {
		
		let url = `${this.url}`;
		let iJson = JSON.stringify(idAsigEst);
		return this.http.post(url+'actividades',iJson, this.options)
				   .map(r => r.json()) 
		
	}


}