import { Component, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-oferta-filter',
  templateUrl: './ofertafilter.component.html',
  styleUrl: './ofertafilter.component.scss'
})
export class OfertaFilterComponent {
  @Output() filtrosAplicados = new EventEmitter<{ categoria?: string, ubicacion?: string, estado?: string }>();

  filtros = {
    categoria: '',
    ubicacion: '',
    estado: ''
  };

  categorias = ['Tecnología', 'Educación', 'Salud'];
  ubicaciones = ['Remoto', 'Ciudad A', 'Ciudad B'];

  aplicarFiltros() {
    this.filtrosAplicados.emit(this.filtros);
  }
}
