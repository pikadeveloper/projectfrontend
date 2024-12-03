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

  buscarEmpleos() {
    // Aquí puedes implementar la lógica de búsqueda
    console.log('Buscando:', this.searchTerm);
    // Por ejemplo, podrías navegar al componente de filtro con el término de búsqueda
    this.router.navigate(['/filtro'], {
      queryParams: { search: this.searchTerm }
    });
  }
}
