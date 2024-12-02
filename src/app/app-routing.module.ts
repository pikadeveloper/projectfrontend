import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { FiltroComponent } from './pages/filtro/filtro.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CrearOfertaComponent } from './pages/crear-oferta/crear-oferta.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';



const routes: Routes = [
  { path:'',redirectTo: 'inicio', pathMatch: 'full'},
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'filtro', component: FiltroComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'crear', component: CrearOfertaComponent },
  { path: 'categoria', component: CategoriaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }