import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

interface Paquete {
  direccion: string;
  codigoPostal: string;
  destinatario: string;
  ciudad: string;
  pais: string;
}

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.scss']
})
export class PickupComponent implements OnInit, AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  @ViewChild('signatureCanvas') signatureCanvas!: ElementRef<HTMLCanvasElement>;

  paquete: Paquete = {
    direccion: 'C. Ing. Lucio Gutierrez 91',
    codigoPostal: '44130',
    destinatario: 'Juan Pérez',
    ciudad: 'Guadalajara, Jal.',
    pais: 'Mexico',
  };

  position = {
    lat: 20.66959,
    lng: -103.38540
  };

  label = {
    color: 'red',
    text: 'Marcador de ejemplo'
  };

  deliver_lottie: AnimationOptions = {
    path: '../../../assets/lotties/deliver.json',
  };

  capturedImage: string | null = null;
  showCamera: boolean = false;
  stream: MediaStream | null = null;

  private signatureCtx!: CanvasRenderingContext2D;
  private isDrawing = false;

  ngOnInit(): void {
    // Inicialización adicional si es necesaria
  }

  ngAfterViewInit(): void {
    this.initSignatureCanvas();
  }

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

    // Para dispositivos táctiles
    canvas.addEventListener('touchstart', this.startDrawing.bind(this));
    canvas.addEventListener('touchmove', this.draw.bind(this));
    canvas.addEventListener('touchend', this.stopDrawing.bind(this));
  }

  private startDrawing(event: MouseEvent | TouchEvent): void {
    this.isDrawing = true;
    this.draw(event);
  }

  private draw(event: MouseEvent | TouchEvent): void {
    if (!this.isDrawing) return;

    const canvas = this.signatureCanvas.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = (event instanceof MouseEvent ? event.clientX : event.touches[0].clientX) - rect.left;
    const y = (event instanceof MouseEvent ? event.clientY : event.touches[0].clientY) - rect.top;

    this.signatureCtx.lineTo(x, y);
    this.signatureCtx.stroke();
    this.signatureCtx.beginPath();
    this.signatureCtx.moveTo(x, y);
  }

  private stopDrawing(): void {
    this.isDrawing = false;
    this.signatureCtx.beginPath();
  }

  clearSignature(): void {
    const canvas = this.signatureCanvas.nativeElement;
    this.signatureCtx.clearRect(0, 0, canvas.width, canvas.height);
  }

  saveSignature(): void {
    const signatureImage = this.signatureCanvas.nativeElement.toDataURL('image/png');
    console.log('Firma guardada:', signatureImage);
    // Aquí puedes implementar la lógica para guardar o enviar la firma
  }

  async captureImage() {
    this.showCamera = true;
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoElement.nativeElement.srcObject = this.stream;
    } catch (err) {
      console.error('Error al acceder a la cámara:', err);
      alert('No se pudo acceder a la cámara. Por favor, asegúrese de que tiene una cámara conectada y que ha dado los permisos necesarios.');
      this.showCamera = false;
    }
  }

  takePicture() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0);
    this.capturedImage = canvas.toDataURL('image/jpeg');
    this.stopCamera();
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
    this.showCamera = false;
  }

  marcarComoEntregado(): void {
    if (!this.capturedImage) {
      alert('Por favor, capture una imagen de evidencia antes de marcar como entregado.');
      return;
    }
    if (!this.signatureCanvas.nativeElement.toDataURL().includes('data:image/png')) {
      alert('Por favor, pida al cliente que firme antes de marcar como entregado.');
      return;
    }
    console.log('Paquete marcado como entregado');
    // Aquí puedes implementar la lógica para marcar el paquete como entregado
    // y enviar la evidencia (this.capturedImage) y la firma al servidor
  }

  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}