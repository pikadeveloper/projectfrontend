import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FrontConectaIT';
  menuVisible = false;

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) {
    if (auth.isLoggedIn()) {
      auth.navigateHome()
    }
  }
  navegar(url: string) {
    this.router.navigate([url]);
  }

  public logueado(){
    if (this.auth.isLoggedIn()) {
      return true
    } else {
      return false
    }
  }

  public isInicio(){
    if (this.router.url === '/inicio') {
      return true;
    } else {
      return false;
    }
  }

  async salir() {
    await this.auth.logout();
    this.snackBar.open('Sesión cerrada correctamente', 'OK', {
      duration: 5000
    })
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

}
