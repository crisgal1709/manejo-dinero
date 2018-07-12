import { Component, OnInit } from '@angular/core';
import { Ingreso } from '../../models/ingreso';
import { IngresoService } from '../../services/ingreso.service';
import { Global } from '../../services/global'


@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css'],
  providers: [IngresoService]
})
export class IngresoComponent implements OnInit {

 	public ingresos: Ingreso[];
	public url: string;
  	public load: boolean;

  constructor(
  	private _ingresoService: IngresoService
  	) { 
  	this.url = Global.url;
    this.load = false;
  }

  ngOnInit() {

  	this.getIngresos();
  }

  getIngresos(){
  	this._ingresoService.getIngresos().subscribe(
  		response => {
  			console.log(response.ingresos)
  			this.ingresos = response.ingresos
        	this.load = true;
  		},

  		error => {
  			console.log(error)
  		}

  	)
  }

}
