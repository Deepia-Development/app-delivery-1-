import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  @ViewChild('video') videoElement!: ElementRef;
  isCameraOn = false;

  constructor() { }

  ngOnInit(): void {
  }

  async toggleCamera() {
    if (this.isCameraOn) {
      this.stopCamera();
    } else {
      await this.startCamera();
    }
    this.isCameraOn = !this.isCameraOn;
  }

  async startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoElement.nativeElement.srcObject = stream;
      this.videoElement.nativeElement.play();
    } catch (err) {
      console.error('Error al acceder a la cámara:', err);
    }
  }

  stopCamera() {
    const stream = this.videoElement.nativeElement.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track: MediaStreamTrack) => track.stop());
  }

  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  manos_lottie: AnimationOptions = {
    path: '../../../assets/lotties/manos.json',
  };
}


// realizaar una condicion que al escanear pase a la vista de pickup