import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Ingreso } from '../models/ingreso';
import { Global } from './global';

@Injectable()

export class IngresoService{

	public url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = Global.url
	}

	testService(){
		return 'Probando el servicio de ingresos';
	}

	saveIngreso(ingreso: Ingreso): Observable<any>{
		let params = JSON.stringify(ingreso);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.post(this.url + 'save-ingreso', params, {headers: headers});

	}

	getIngresos(): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		
		return this._http.get(this.url + '/ingresos', {headers: headers});
	}


}