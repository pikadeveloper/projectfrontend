import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../services/navegacion.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public errorMessage: string = '';
  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(60)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(60)])
  })
    hide = true;
    constructor(private auth: AuthService, private snackBar: MatSnackBar, private navigationService: NavigationService) {
      if (auth.isLoggedIn()) {
        auth.navigateHome()
      }
    }

    async login() {
      const email = this.loginForm.controls.username.getRawValue();
      const password = this.loginForm.controls.password.getRawValue();
      const response = await this.auth.login(email ?? '', password ?? '');
      if (response.success) {
        this.snackBar.open('SESIÓN INICIADA', 'OK', {
                duration: 3000
              })
        // La redirección ya se maneja en el servicio
      } else {
        // Mostrar el mensaje de error al usuario
        this.snackBar.open(response.message, 'OK', {
                duration: 3000
              })
        this.errorMessage = response.message;
      }
    }
    // public login = async () => {
    //   if (this.loginForm.valid) {
    //     console.log(this.loginForm.valid);
    //     const username = this.loginForm.controls.username.getRawValue();
    //     const password = this.loginForm.controls.password.getRawValue();
    //     const text = await this.auth.login(username ?? '', password ?? '');
    //     this.snackBar.open('SESIÓN INICIADA', 'OK', {
    //       duration: 3000
    //     })
    //     this.navigationService.redirectWithDelay('/inicio');
    //   } else {
    //     this.snackBar.open('POR FAVOR INGRESE LOS DATOS CORRECTAMENTE', 'OK', {
    //       duration: 3000
    //     })
    //   }
    // }

}
