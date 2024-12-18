import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-empleadores-inicio',
  templateUrl: './registro-empleadores-inicio.component.html',
  styleUrls: ['./registro-empleadores-inicio.component.scss']
})
export class RegistroEmpleadoresInicioComponent {

  constructor(private router: Router) {}

  irARegistroEmpleador() {
    this.router.navigate(['/registro-empleador']);
  }
}
