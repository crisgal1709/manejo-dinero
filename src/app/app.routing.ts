import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';


//Carga los componentes
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';

//Crea las rutas

const appRoutes: Routes = [
	{path: '/', component: LoginComponent},
	{path: '/ingresos', component: IngresoComponent},
	{path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);