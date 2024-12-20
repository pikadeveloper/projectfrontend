import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.scss']
})
export class RegistroEmpresaComponent {
  public empresaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.empresaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      razon_social: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      rut: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(20)]],
      giro: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      direccion_comercial: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      email_contacto: ['', [Validators.required, Validators.email, Validators.maxLength(60)]],
      telefono: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(20)]],
      sitio_web: ['', [Validators.maxLength(200)]],
      descripcion: ['', [Validators.maxLength(500)]],
      ubicacion: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    });
  }

  public registrarEmpresa = async () => {
    if (this.empresaForm.valid) {
        try {
            const empresaData = this.empresaForm.getRawValue();
            const response = await this.authService.createEmpresa(empresaData);

            if (response?.success) {
                this.snackBar.open('EMPRESA REGISTRADA CORRECTAMENTE', 'OK', {
                    duration: 3000,
                });
                setTimeout(() => {
                    this.router.navigate(['/inicio']);
                }, 1000);
            } else {
                this.snackBar.open(response?.message || 'Error desconocido', 'OK', {
                    duration: 3000,
                });
            }
        } catch (error) {
            if (error instanceof HttpErrorResponse) {
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
                console.error('Error desconocido:', error);
                this.snackBar.open('Ocurrió un error inesperado.', 'OK', { duration: 3000 });
            }
        }
    } else {
        this.snackBar.open('POR FAVOR INGRESE LOS DATOS CORRECTAMENTE', 'OK', {
            duration: 3000,
        });
        this.empresaForm.markAllAsTouched();
    }
};

  // public async registrarEmpresa() {
  //   if (this.empresaForm.valid) {
  //     try {
  //       const empresaData = this.empresaForm.value;
  //       const response = await this.authService.createEmpresa(this.empresaForm.getRawValue());

  //       if ('success' in response && response.success) {
  //         this.snackBar.open('EMPRESA REGISTRADA CORRECTAMENTE', 'OK', {
  //           duration: 3000,
  //         });
  //         setTimeout(() => {
  //           // Redirige al dashboard o a donde desees
  //           this.router.navigate(['/inicio']);
  //         }, 1000);
  //       } else if (response && 'message' in response) {
  //         this.snackBar.open(response.message || 'Error desconocido', 'OK', {
  //           duration: 3000,
  //         });
  //       } else {
  //         this.snackBar.open('HUBO UN ERROR INESPERADO. INTENTE NUEVAMENTE.', 'OK', {
  //           duration: 3000,
  //         });
  //       }
  //     } catch (error) {
  //       console.error('Error en el registro de la empresa:', error);
  //       this.snackBar.open('HUBO UN ERROR DE CONEXIÓN. INTENTE NUEVAMENTE.', 'OK', {
  //         duration: 3000,
  //       });
  //     }
  //   } else {
  //     this.snackBar.open('POR FAVOR INGRESE LOS DATOS CORRECTAMENTE', 'OK', {
  //       duration: 3000,
  //     });
  //     this.empresaForm.markAllAsTouched();
  //   }
  // }

  // public valid = async () => {
  //   if (this.usersForm.valid) {
  //     try {
  //       const response = await (await this.authService.signup(this.usersForm.getRawValue())).toPromise();

  //       if (response?.success) {
  //         this.snackBar.open('USUARIO REGISTRADO CORRECTAMENTE', 'OK', {
  //           duration: 3000,
  //         });
  //         setTimeout(() => {
  //           this.router.navigate(['/inicio']);
  //         }, 1000);
  //       } else {
  //         this.snackBar.open(response?.message, 'OK', {
  //           duration: 3000,
  //         });
  //       }
  //     } catch (error) {
  //       if (error instanceof HttpErrorResponse) {
  //         // Es un error HTTP, puedes manejarlo aquí
  //         console.error('Error HTTP:', error);
  //         if (error.status === 0) {
  //           this.snackBar.open('No se pudo conectar al servidor. Verifique su conexión.', 'OK', {
  //             duration: 3000,
  //           });
  //         } else if (error.error?.message) {
  //           this.snackBar.open(error.error.message, 'OK', {
  //             duration: 3000,
  //           });
  //         } else {
  //           this.snackBar.open('Hubo un error inesperado. Intente nuevamente.', 'OK', {
  //             duration: 3000,
  //           });
  //         }
  //       } else {
  //         // Es otro tipo de error
  //         console.error('Error desconocido:', error);
  //         this.snackBar.open('Ocurrió un error inesperado.', 'OK', { duration: 3000 });
  //       }
  // };

  // }
  // }
}
