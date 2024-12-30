// pickup.component.ts
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';

interface DeliveryPackage {
  id: string;
  status: 'pending' | 'picked' | 'delivered';
  recipient: {
    name: string;
    phone: string;
  };
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  expanded: boolean;
  capturedImage: string | null;
  signature: string | null;
}

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.scss'],
})
export class PickupComponent implements OnInit, AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  @ViewChild('signatureCanvas') signatureCanvas!: ElementRef<HTMLCanvasElement>;

  packages: DeliveryPackage[] = [
    {
      id: 'PKG-001',
      status: 'picked',
      recipient: {
        name: 'Juan Pérez',
        phone: '+52 333 123 4567',
      },
      address: {
        street: 'C. Ing. Lucio Gutierrez 91',
        postalCode: '44130',
        city: 'Guadalajara',
        country: 'México',
        coordinates: {
          lat: 20.66959,
          lng: -103.3854,
        },
      },
      expanded: false,
      capturedImage: null,
      signature: null,
    },
    {
      id: 'PKG-002',
      status: 'picked',
      recipient: {
        name: 'María González',
        phone: '+52 333 987 6543',
      },
      address: {
        street: 'Av. Vallarta 3233',
        postalCode: '44690',
        city: 'Guadalajara',
        country: 'México',
        coordinates: {
          lat: 20.67959,
          lng: -103.3954,
        },
      },
      expanded: false,
      capturedImage: null,
      signature: null,
    },
    {
      id: 'PKG-003',
      status: 'delivered',
      recipient: {
        name: 'Carlos Ramírez',
        phone: '+52 333 456 7890',
      },
      address: {
        street: 'Av. México 2578',
        postalCode: '44600',
        city: 'Guadalajara',
        country: 'México',
        coordinates: {
          lat: 20.68959,
          lng: -103.3754,
        },
      },
      expanded: false,
      capturedImage: null,
      signature: null,
    },
  ];

  currentSigningPackage: DeliveryPackage | null = null;
  activePackage: DeliveryPackage | null = null;
  showCamera = false;
  showSignature = false;
  stream: MediaStream | null = null;
  isLoading = false;

  private signatureCtx!: CanvasRenderingContext2D;
  private isDrawing = false;

  deliver_lottie: AnimationOptions = {
    path: '../../../assets/lotties/deliver.json',
    autoplay: true,
    loop: true,
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  ngAfterViewInit(): void {
    if (this.signatureCanvas) {
      this.initSignatureCanvas();
    }
  }

  togglePackage(pkg: DeliveryPackage): void {
    this.packages.forEach((p) => {
      if (p.id !== pkg.id) {
        p.expanded = false;
      }
    });
    pkg.expanded = !pkg.expanded;
  }

  // Funciones de firma
  private initSignatureCanvas(): void {
    const canvas = this.signatureCanvas.nativeElement;
    this.signatureCtx = canvas.getContext('2d')!;
    this.signatureCtx.lineWidth = 2;
    this.signatureCtx.lineCap = 'round';
    this.signatureCtx.strokeStyle = '#000000';

    canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    canvas.addEventListener('mousemove', this.draw.bind(this));
    canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
    canvas.addEventListener('mouseout', this.stopDrawing.bind(this));

    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.startDrawing(e);
    });
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      this.draw(e);
    });
    canvas.addEventListener('touchend', () => {
      this.stopDrawing();
    });
  }

  private startDrawing(event: MouseEvent | TouchEvent): void {
    this.isDrawing = true;
    this.draw(event);
  }

  private draw(event: MouseEvent | TouchEvent): void {
    if (!this.isDrawing) return;

    const canvas = this.signatureCanvas.nativeElement;
    const rect = canvas.getBoundingClientRect();
    let x, y;

    if (event instanceof MouseEvent) {
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
    } else {
      x = event.touches[0].clientX - rect.left;
      y = event.touches[0].clientY - rect.top;
    }

    this.signatureCtx.lineTo(x, y);
    this.signatureCtx.stroke();
    this.signatureCtx.beginPath();
    this.signatureCtx.moveTo(x, y);
  }

  private stopDrawing(): void {
    this.isDrawing = false;
    this.signatureCtx.beginPath();
  }

  // Funciones de firma y cámara
  openSignature(pkg: DeliveryPackage): void {
    this.currentSigningPackage = pkg; // Update this line
    this.showSignature = true;
    setTimeout(() => {
      this.initSignatureCanvas();
    });
  }

  clearSignature(): void {
    if (this.signatureCanvas) {
      const canvas = this.signatureCanvas.nativeElement;
      this.signatureCtx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  saveSignature(): void {
    if (this.currentSigningPackage && this.signatureCanvas) {
      const signatureImage =
        this.signatureCanvas.nativeElement.toDataURL('image/png');
      this.currentSigningPackage.signature = signatureImage;
      this.closeSignatureModal();
    }
  }

  async captureImage(pkg: DeliveryPackage): Promise<void> {
    this.activePackage = pkg;
    this.showCamera = true;
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (this.videoElement) {
        this.videoElement.nativeElement.srcObject = this.stream;
      }
    } catch (err) {
      console.error('Error al acceder a la cámara:', err);
      alert(
        'No se pudo acceder a la cámara. Por favor, verifique los permisos.'
      );
      this.showCamera = false;
    }
  }

  takePicture(pkg?: DeliveryPackage): void {
    if (!this.activePackage || !this.videoElement || !this.canvasElement)
      return;

    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');

    if (context) {
      context.drawImage(video, 0, 0);
      this.activePackage.capturedImage = canvas.toDataURL('image/jpeg');
      this.stopCamera();
    }
  }

  stopCamera(): void {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
    this.showCamera = false;
    this.activePackage = null;
  }

  marcarComoEntregado(pkg: DeliveryPackage): void {
    if (!this.validateDelivery(pkg)) {
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      pkg.status = 'delivered';
      pkg.expanded = false;
      this.isLoading = false;
      alert('¡Paquete marcado como entregado correctamente!');
    }, 1500);
  }

  private validateDelivery(pkg: DeliveryPackage): boolean {
    if (!pkg.capturedImage) {
      alert(
        'Por favor, capture una foto de evidencia antes de marcar como entregado.'
      );
      return false;
    }

    if (!pkg.signature) {
      alert(
        'Por favor, obtenga la firma del cliente antes de marcar como entregado.'
      );
      return false;
    }

    return true;
  }

  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  closeSignatureModal(): void {
    this.currentSigningPackage = null;
    this.showSignature = false;
  }

  closeCamera(): void {
    this.stopCamera();
  }
}
