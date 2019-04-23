import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

//importamos los orepaddores de reacti necesarios para realizar la peticiones con el protocolo HTTP
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';



@Injectable()
export class AsistenciasService {

	private options;

	//private url = 'http://192.168.0.4:80/siescolarappservicios/index.php/Notas_controller/';
	//private url = 'http://localhost:80/siescolarappservicios/index.php/Login_controller/';
	private url = 'http://app.siescolar.online/index.php/asistencias_controller/';

	
	constructor(private http:Http) {

		let headers = new Headers({'Content-Type':'application/json'});
		this.options = new RequestOptions({headers: headers})

	}


	getAsignaturas(idEstudiante): Observable<any> {
		
		let url = `${this.url}`;
		let iJson = JSON.stringify(idEstudiante);
		return this.http.post(url+'asignaturas',iJson, this.options)
				   .map(r => r.json())
				   .catch(this.catchError) 
		
	}


	getAsistencias(idAsigEst): Observable<any> {
		
		let url = `${this.url}`;
		let iJson = JSON.stringify(idAsigEst);
		return this.http.post(url+'asistencias',iJson, this.options)
				   .map(r => r.json())
				   .catch(this.catchError) 
		
	}


	private catchError(error: Response | any){

		//console.log(error);
		return Observable.throw(error.json().error || "ServerError");
	}


}