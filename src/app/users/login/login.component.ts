import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
// import { AuthService } from '../../_services/autenticacion/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  passwordFieldType: string = 'password';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router /*, private authService: AuthService */) {}

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.email && this.password) {
      // Simulación de inicio de sesión exitoso
      console.log('Simulando inicio de sesión exitoso');
      this.successMessage = 'Inicio de sesión exitoso';
      // Simulación de almacenamiento de token JWT
      localStorage.setItem('token', 'mock-jwt-token');
      setTimeout(() => {
        this.router.navigate(['/inicio']);
      }, 2000); // Redirige después de 2 segundos
    } else {
      this.errorMessage = 'Por favor, ingrese email y contraseña';
    }

    /* Código comentado para el servicio de autenticación real
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        (response: any) => {
          console.log('Login successful', response);
          this.successMessage = 'Inicio de sesión exitoso';
          // Almacenar el token JWT
          localStorage.setItem('token', response.data.token);
          setTimeout(() => {
            this.router.navigate(['/inicio']);
          }, 2000); // Redirige después de 2 segundos
        },
        (error: any) => {
          console.error('Login failed', error);
          this.errorMessage = error.error?.message || 'Error al iniciar sesión';
        }
      );
    } else {
      this.errorMessage = 'Por favor, ingrese email y contraseña';
    }
    */
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  contactAdmin() {
    console.log('Contacting admin');
    // Implementa la lógica para contactar al administrador
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-pass']);
  }
}