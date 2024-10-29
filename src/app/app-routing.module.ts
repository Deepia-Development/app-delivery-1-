import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './users/login/login.component';
import { SignupComponent } from './users/signup/signup.component';
import { ForgotPassComponent } from './users/forgot-pass/forgot-pass.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { InstruccionesComponent } from './componentes/instrucciones/instrucciones.component';
import { PickupComponent } from './componentes/pickup/pickup.component';
import { EnviosPendientesComponent } from './componentes/envios-pendientes/envios-pendientes.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-pass', component: ForgotPassComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'instrucciones', component: InstruccionesComponent },
  { path: 'pickup', component: PickupComponent },
  { path: 'envios-pendientes', component: EnviosPendientesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
