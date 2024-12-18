import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = `${environment.API}ofertas`;

  constructor(private http: HttpClient) { }

  // Obtener todas las ofertas con filtros opcionales
  getOfertas(filtros?: { categoria?: string, ubicacion?: string, estado?: string }): Observable<any> {
    let params = new HttpParams();
    if (filtros) {
      if (filtros.categoria) params = params.append('categoria', filtros.categoria);
      if (filtros.ubicacion) params = params.append('ubicacion', filtros.ubicacion);
      if (filtros.estado) params = params.append('estado', filtros.estado);
    }
    return this.http.get(this.apiUrl, { params });
  }

  // Obtener una oferta específica por ID
  getOfertaPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Obtener ofertas de una empresa específica
  getOfertasPorEmpresa(empresaId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/empresa/${empresaId}`);
  }

  // Crear una nueva oferta
  crearOferta(oferta: any): Observable<any> {
    return this.http.post(this.apiUrl, oferta);
  }

  // Actualizar una oferta existente
  actualizarOferta(id: number, oferta: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, oferta);
  }

  // Eliminar una oferta
  eliminarOferta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
