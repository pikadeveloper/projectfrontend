import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, FormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-registro-empleador',
  templateUrl: './registro-empleador.component.html',
  styleUrl: './registro-empleador.component.scss'
})


export class RegistroEmpleadorComponent {
  constructor(public snackBar: MatSnackBar, public authService: AuthService, private router: Router){

  }
  public usersForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
    email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(60), Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(60)]),
    address1: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    address2: new FormControl('', [Validators.minLength(2), Validators.maxLength(60)]),
    is_employer: new FormControl(true, Validators.required),
    cellphone: new FormControl('', [Validators.minLength(9), Validators.maxLength(9)]),
  })

  public valid = async () => {
    if (this.usersForm.valid) {
      try {
        const response = await (await this.authService.signup(this.usersForm.getRawValue())).toPromise();

        if (response?.success) {
          this.snackBar.open('USUARIO REGISTRADO CORRECTAMENTE', 'OK', {
            duration: 3000,
          });
          setTimeout(() => {
            this.router.navigate(['/inicio']);
          }, 1000);
        } else {
          this.snackBar.open(response?.message, 'OK', {
            duration: 3000,
          });
        }
      } catch (error) {
        if (error instanceof HttpErrorResponse) {
          // Es un error HTTP, puedes manejarlo aquí
          console.error('Error HTTP:', error);
          if (error.status === 0) {
            this.snackBar.open('No se pudo conectar al servidor. Verifique su conexión.', 'OK', {
              duration: 3000,
            });
          } else if (error.error?.message) {
            this.snackBar.open(error.error.message, 'OK', {
              duration: 3000,
            });
          } else {
            this.snackBar.open('Hubo un error inesperado. Intente nuevamente.', 'OK', {
              duration: 3000,
            });
          }
        } else {
          // Es otro tipo de error
          console.error('Error desconocido:', error);
          this.snackBar.open('Ocurrió un error inesperado.', 'OK', { duration: 3000 });
        }
  };

  }
  }
};
