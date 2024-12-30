import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

interface LockerInfo {
  lockerName: string;
  paquetes: number;
  ubicacion: string;
  horario: string;
  referencias?: string;
  nip: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  @ViewChild('video') videoElement!: ElementRef;
  usuario = 'None';
  lockerPackages: LockerInfo[] = [
    {
      lockerName: 'Minerva',
      paquetes: 4,
      ubicacion: 'Glorieta Minerva #45, Zona Centro',
      horario: 'Lunes a Domingo 24/7',
      referencias: 'Frente a la estatua de Minerva, junto al kiosko',
      nip: '2333',
    },
    {
      lockerName: 'Chapultepec',
      paquetes: 6,
      ubicacion: 'Av. Chapultepec #34, Col. Moderna',
      horario: 'Lunes a Domingo 24/7',
      referencias: 'Entre Morelos y Niños Héroes, frente al parque',
      nip: '7464',
    },
  ];

  hasFlash: boolean = false;
  flashlight: MediaStreamTrack | null = null;
  totalPaquetes: number = 0;
  isCameraOn = false;
  nipInputs: { [key: string]: string } = {};
  nipError: string = '';
  nipSuccess: string = '';
  selectedLocker: LockerInfo | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.fetchDataFromBackend();
  }

  async toggleCamera() {
    const cameraModal = document.getElementById('cameraModal');
    if (this.isCameraOn) {
      this.stopCamera();
      cameraModal?.classList.add('hidden');
    } else {
      await this.startCamera();
      cameraModal?.classList.remove('hidden');
    }
    this.isCameraOn = !this.isCameraOn;
  }

  async startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      this.videoElement.nativeElement.srcObject = stream;
      this.videoElement.nativeElement.play();

      const tracks = stream.getVideoTracks();
      if (tracks.length > 0) {
        const capabilities = tracks[0].getCapabilities();
        this.hasFlash = 'torch' in capabilities;
        if (this.hasFlash) {
          this.flashlight = tracks[0];
        }
      }
    } catch (err) {
      console.error('Error al acceder a la cámara:', err);
    }
  }

  async toggleFlashlight() {
    if (this.flashlight && this.hasFlash) {
      try {
        const currentSettings = this.flashlight.getSettings();
        const newTorchSetting = !((currentSettings as any).torch || false);
        await this.flashlight.applyConstraints({
          advanced: [{ torch: newTorchSetting } as any],
        });
      } catch (err) {
        console.error('Error al toggle flashlight:', err);
      }
    }
  }

  fetchDataFromBackend() {
    setTimeout(() => {
      const backendData = {
        usuario: 'Hugo',
        lockers: this.lockerPackages,
      };

      this.usuario = backendData.usuario;
      this.lockerPackages = backendData.lockers;
      this.totalPaquetes = this.lockerPackages.reduce(
        (total, locker) => total + locker.paquetes,
        0
      );
    }, 1000);
  }

  validateNip(lockerName: string) {
    const locker = this.lockerPackages.find((l) => l.lockerName === lockerName);
    const nip = this.nipInputs[lockerName];

    if (!locker) {
      this.nipError = 'Locker no encontrado';
      this.nipSuccess = '';
      return;
    }

    if (!nip || nip.length !== 4) {
      this.nipError = 'El NIP debe tener 4 dígitos';
      this.nipSuccess = '';
    } else if (!/^\d+$/.test(nip)) {
      this.nipError = 'El NIP solo debe contener números';
      this.nipSuccess = '';
    } else if (nip !== locker.nip) {
      this.nipError = 'NIP incorrecto';
      this.nipSuccess = '';
    } else {
      this.nipError = '';
      this.nipSuccess = 'NIP correcto';
      setTimeout(() => {
        this.router.navigate(['/envios-pendientes'], {
          queryParams: {
            lockerName: locker.lockerName,
            paquetes: locker.paquetes,
            ubicacion: locker.ubicacion,
            horario: locker.horario,
            referencias: locker.referencias,
          },
        });
      }, 2000);
    }
  }

  stopCamera() {
    const stream = this.videoElement.nativeElement.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track: MediaStreamTrack) => track.stop());
  }

  openLocationModal(lockerName: string) {
    const locationModal = document.getElementById('locationModal');
    this.selectedLocker =
      this.lockerPackages.find((locker) => locker.lockerName === lockerName) ||
      null;
    locationModal?.classList.remove('hidden');
  }

  closeLocationModal() {
    const locationModal = document.getElementById('locationModal');
    locationModal?.classList.add('hidden');
    this.selectedLocker = null;
  }

  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  manos_lottie: AnimationOptions = {
    path: '../../../assets/lotties/manos.json',
  };
}
