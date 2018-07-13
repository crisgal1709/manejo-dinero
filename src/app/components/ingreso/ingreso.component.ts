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
  public ingreso: Ingreso;
  public savedIngreso: Ingreso;
  public action_form: number;

  public saved:   boolean;
  public updated: boolean;
  public deleted: boolean;

  constructor(
  	private _ingresoService: IngresoService
  	) { 
  	this.url = Global.url;
    this.load = false;
    this.saved = false;
    this.updated = false;
    this.deleted = false;

    this.crearInstancia();

    console.log(this.ingreso._id);
  }

  ngOnInit() {

  	this.getIngresos();

    this.action_form = 1;


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

  onSubmit(form){

    if (this.action_form == 1) {
      this.saveIngreso(form);
    } else {
      this.updateIngreso(form);
    }
    

  }

  saveIngreso(form){
    this._ingresoService.saveIngreso(this.ingreso)
    .subscribe(
      response => {
        if (response.ingreso) {
          this.savedIngreso = response.ingreso;
          this.saved = true;
          this.updated = false;
          this.deleted = false;
          this.action_form = 1;
          form.reset();
          this.getIngresos();
          console.log('Ingreso guardado');
        } else {
          this.saved = false;
        }
      },

      error => {
        console.log(<any>error);
      }
      )

    console.log(this.ingreso._id);
  }

  updateIngreso(form){
    this._ingresoService.updateIngreso(this.ingreso)
    .subscribe(
      response => {
        if (response.ingreso) {
          this.savedIngreso = response.ingreso;
          this.action_form = 2;
          this.updated = true;
          this.saved = false;
          this.deleted = false;

          console.log('Ingreso actualizado');
        } else {
          this.updated = false;
        }
      },

      error => {
        console.log(<any>error);
      }
      )
  }

  editIngreso(ingreso){
     this.ingreso = ingreso;
     this.action_form = 2;
  }

  deleteIngreso(ingreso){
    console.log(ingreso)
    this._ingresoService.deleteIngreso(ingreso._id)
                .subscribe(
                  response => {
                    if (response.ingreso) {
                      console.log(response.ingreso);
                      this.deleted = true;
                      this.saved = false;
                      this.updated = false;
                      
                    }
                  },

                  error => {
                    console.log(<any>error);
                    this.deleted = false;
                  }
                 );
        this.getIngresos()
        this.action_form = 1;
  }

  crearInstancia(){

    this.ingreso = new Ingreso('', '', '', '');
  }

  newIngreso(){
    this.crearInstancia();
    document.getElementsByTagName('form')[0].reset();
    this.action_form = 1;
    this.saved = false;
    this.updated = false;
    this.deleted = false;
  }

}
