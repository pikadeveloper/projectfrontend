import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FrontConectaIT';
  menuVisible = false;
  loggedIn$: Observable<boolean>;
  isEmployer$: Observable<boolean>;
  hasEmpresa$: Observable<boolean>;

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.loggedIn$ = this.auth.loggedIn$;
    this.isEmployer$ = this.auth.isEmployer$;
    this.hasEmpresa$ = this.auth.hasEmpresa$;

  }

  ngOnInit() {
    // Si el usuario ya estaba logueado al cargar la app, puedes navegar
    if (this.auth.isLoggedIn()) {
      this.auth.navigateHome();
    }
  }

  navegar(url: string) {
    this.router.navigate([url]);
  }

  logueado(): boolean {
    return this.auth.isLoggedIn();
  }

  isInicio(): boolean {
    return this.router.url === '/inicio';
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
