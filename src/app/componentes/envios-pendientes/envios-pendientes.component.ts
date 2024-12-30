import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Package {
  id: number;
  destinatario: string;
  remitente: string;
  fechaCreacion: string;
  direccion: string;
  estado: string;
  cajon: string;
  guiaImpresa: boolean;
  fotoRegistrada: boolean;
  reporteProblema?: {
    tipo: string;
    descripcion: string;
    fecha: string;
  };
  detalles: {
    peso?: string;
    dimensiones?: string;
    instrucciones?: string;
    telefono?: string;
  };
}

@Component({
  selector: 'app-envios-pendientes',
  templateUrl: './envios-pendientes.component.html',
  styleUrls: ['./envios-pendientes.component.scss'],
})
export class EnviosPendientesComponent implements OnInit {
  @ViewChild('video') videoElement!: ElementRef;
  lockerName: string | null = null;
  paquetesTotales: number = 0;
  paquetesPendientes: number = 0;
  ubicacion: string | null = null;
  horario: string | null = null;
  referencias: string | null = null;
  showDetails: { [key: number]: boolean } = {};

  // Estados de los modals
  showCameraModal = false;
  showReportModal = false;
  showLoadingModal = false;
  selectedPackageId: number | null = null;

  // Estado del reporte
  reportType: string = '';
  reportDescription: string = '';

  packages: Package[] = [
    {
      id: 12345,
      destinatario: 'Carlos López',
      remitente: 'María González',
      fechaCreacion: '2024-10-29',
      direccion: 'Calle Falsa 123, Ciudad Ejemplo',
      estado: 'Por recoger',
      cajon: 'A-123',
      guiaImpresa: false,
      fotoRegistrada: false,
      detalles: {
        peso: '2.5 kg',
        dimensiones: '30x20x15 cm',
        instrucciones: 'Frágil - Manejar con cuidado',
        telefono: '+52 555-0123',
      },
    },
  ];

  filteredPackages: Package[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.lockerName = params['lockerName'];
      this.ubicacion = params['ubicacion'];
      this.horario = params['horario'];
      this.referencias = params['referencias'];
      this.filterPackages();
      this.actualizarContadores();
    });
  }

  actualizarContadores(): void {
    this.paquetesTotales = this.filteredPackages.length;
    this.paquetesPendientes = this.filteredPackages.filter(
      (pkg) => pkg.estado === 'Por recoger'
    ).length;
  }

  filterPackages(): void {
    if (this.lockerName) {
      this.filteredPackages = this.packages;
      this.actualizarContadores();
    }
  }

  toggleDetails(packageId: number): void {
    this.showDetails[packageId] = !this.showDetails[packageId];
  }

  async imprimirGuia(packageId: number): Promise<void> {
    this.showLoadingModal = true;
    try {
      // Llamar a la impresora
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const pkg = this.packages.find((p) => p.id === packageId);
      if (pkg) {
        pkg.guiaImpresa = true;
      }
    } finally {
      this.showLoadingModal = false;
    }
  }

  abrirModalCamara(packageId: number): void {
    this.selectedPackageId = packageId;
    this.showCameraModal = true;
    this.startCamera();
  }

  cerrarModalCamara(): void {
    this.showCameraModal = false;
    this.selectedPackageId = null;
    this.stopCamera();
  }

  async tomarFoto(): Promise<void> {
    if (!this.selectedPackageId) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      const pkg = this.packages.find((p) => p.id === this.selectedPackageId);
      if (pkg) {
        pkg.fotoRegistrada = true;
        pkg.estado = 'Recogido';
        this.actualizarContadores();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    } finally {
      this.cerrarModalCamara();
    }
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
    } catch (err) {
      console.error('Error al acceder a la cámara:', err);
    }
  }

  stopCamera() {
    const stream = this.videoElement.nativeElement.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track: MediaStreamTrack) => track.stop());
  }

  abrirModalReporte(packageId: number): void {
    this.selectedPackageId = packageId;
    this.showReportModal = true;
  }

  enviarReporte(): void {
    if (!this.selectedPackageId) return;

    const pkg = this.packages.find((p) => p.id === this.selectedPackageId);
    if (pkg) {
      pkg.reporteProblema = {
        tipo: this.reportType,
        descripcion: this.reportDescription,
        fecha: new Date().toISOString(),
      };
    }

    this.resetReporte();
  }

  resetReporte(): void {
    this.showReportModal = false;
    this.selectedPackageId = null;
    this.reportType = '';
    this.reportDescription = '';
  }
}
