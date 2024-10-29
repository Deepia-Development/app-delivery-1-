import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { GoogleMapsModule } from '@angular/google-maps';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './users/login/login.component';
import { SignupComponent } from './users/signup/signup.component';
import { ForgotPassComponent } from './users/forgot-pass/forgot-pass.component';
import { FormsModule } from '@angular/forms';
import { InstruccionesComponent } from './componentes/instrucciones/instrucciones.component';
import { PickupComponent } from './componentes/pickup/pickup.component';
import { EnviosPendientesComponent } from './componentes/envios-pendientes/envios-pendientes.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    SignupComponent,
    ForgotPassComponent,
    InstruccionesComponent,
    PickupComponent,
    EnviosPendientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ZXingScannerModule,
    GoogleMapsModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }