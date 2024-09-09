import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { AuthService } from '../../_services/autenticacion/auth.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent {
  email: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router, /*private authService: AuthService*/) {}

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.email) {
      this.successMessage = 'Se han enviado las instrucciones de recuperación a tu correo electrónico.';
    } else {
      this.errorMessage = 'Por favor, ingrese su correo electrónico';
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}