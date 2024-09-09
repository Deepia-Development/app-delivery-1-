import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService } from '../../_services/autenticacion/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  user = {
    name: '',
    surname: '',
    email: '',
    password: ''
  };
  confirmPassword: string = '';
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router /*, private authService: AuthService */) {}

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.user.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    // Aquí iría la lógica de registro con el servicio de autenticación
    // Por ahora, simularemos un registro exitoso
    console.log('Usuario registrado exitosamente', this.user);
    this.successMessage = 'Usuario registrado exitosamente';
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000); // Redirige después de 2 segundos

    /* Código comentado para el servicio de autenticación
    this.authService.signup(this.user).subscribe(
      (response: any) => {
        console.log('Usuario registrado exitosamente', response);
        this.successMessage = 'Usuario registrado exitosamente';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000); // Redirige después de 2 segundos
      },
      (error: any) => {
        console.error('Error al registrar usuario', error);
        this.errorMessage = error.error?.message || 'Ocurrió un error al registrar el usuario';
      }
    );
    */
  }

  goToLogIn() {
    this.router.navigate(['/login']);
  }
}