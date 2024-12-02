import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss',
})
export class FiltroComponent {
  filtroPanelOpenState = false;
  budgetPanelOpenState = false;

  region: string[] = ['Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo','Valparaíso','Metropolitana','O´Higgins','Maule','Ñuble','Biobío','Araucanía','Los Ríos','Los Lagos','Aysén', 'Magallanes'];
  experiencia: string[] = ['1 años','2 años','3 años','4 años o más',]
  disponibilidad: string[]= ['tiempo completo','tiempo parcial']

  minAmount: any;
  maxAmount: any;

}
