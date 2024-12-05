import { Component,OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss',
})
export class FiltroComponent implements OnInit  {
  filtroPanelOpenState = false;
  budgetPanelOpenState = false;

  region: string[] = ['Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo','Valparaíso','Metropolitana','O´Higgins','Maule','Ñuble','Biobío','Araucanía','Los Ríos','Los Lagos','Aysén', 'Magallanes'];
  experiencia: string[] = ['1 años','2 años','3 años','4 años o más',]
  disponibilidad: string[]= ['tiempo completo','tiempo parcial']

  minAmount: any;
  maxAmount: any;
  searchTerm: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Obtener el término de búsqueda de los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      this.realizarBusqueda();
    });
  }

  realizarBusqueda() {
    // Aquí implementarías la lógica de búsqueda/filtrado
    console.log('Realizando búsqueda con término:', this.searchTerm);
  }

}
