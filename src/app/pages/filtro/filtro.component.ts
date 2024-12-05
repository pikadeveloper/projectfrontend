import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss'
})

export class FiltroComponent implements OnInit {
  ofertas: any[] = [];
  filtros: { categoria?: string, ubicacion?: string, estado?: string } = {};

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.cargarOfertas();
  }

  cargarOfertas(): void {
    this.postService.getOfertas(this.filtros).subscribe((data) => {
      this.ofertas = data;
    });
  }

  onFiltrosAplicados(filtros: { categoria?: string, ubicacion?: string, estado?: string }): void {
    this.filtros = filtros;
    this.cargarOfertas();
  }

}
