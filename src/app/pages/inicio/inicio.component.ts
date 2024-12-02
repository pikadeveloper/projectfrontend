import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {
  constructor(private router: Router) {

  }
  navegar(url: string) {
    this.router.navigate([url]);
  }

  searchTerm: string = '';

  searchCategories() {
    // Implementa aquí la lógica de búsqueda
    // Por ejemplo, filtrar un array de categorías basado en searchTerm
  }
}
