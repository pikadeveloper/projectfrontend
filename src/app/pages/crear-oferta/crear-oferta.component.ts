import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-oferta',
  templateUrl: './crear-oferta.component.html',
  styleUrl: './crear-oferta.component.scss'
})
export class CrearOfertaComponent {
  filtroPanelOpenState = false;


  categoria: string[] = ['Desarrollo web','Analisis de datos','Ciberseguridad','Desarrollo de aplicaciones móviles']

}
