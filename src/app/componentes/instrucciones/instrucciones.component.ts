import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instrucciones',
  templateUrl: './instrucciones.component.html',
  styleUrls: ['./instrucciones.component.scss'],
})
export class InstruccionesComponent implements OnInit {
  userName: string = 'Hugo'; // This will be replaced with actual user name from backend

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Here you'll fetch the user name from your backend
    // For now using static data
    // this.getUserName();
  }

  hombre_lottie: AnimationOptions = {
    path: '../../../assets/lotties/hombre.json',
    loop: true,
    autoplay: true,
  };

  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  sendInicio(): void {
    this.router.navigate(['/inicio']);
  }

  // Future method to get user name from backend
  // private getUserName(): void {
  //   this.authService.getUserProfile().subscribe(
  //     (response) => {
  //       this.userName = response.name;
  //     },
  //     (error) => {
  //       console.error('Error fetching user name:', error);
  //     }
  //   );
  // }
}
