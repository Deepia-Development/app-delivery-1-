import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { Router } from '@angular/router'; // Import the Router class

@Component({
  selector: 'app-instrucciones',
  templateUrl: './instrucciones.component.html',
  styleUrls: ['./instrucciones.component.scss']
})
export class InstruccionesComponent {
  // Add the router property
  constructor(private router: Router) {}

  hombre_lottie: AnimationOptions = {
    path: '../../../assets/lotties/hombre.json',
  };

  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  sendInicio(){
    this.router.navigate(['/cotizar']);
  }

}
