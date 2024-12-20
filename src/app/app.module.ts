import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { FiltroComponent } from './pages/filtro/filtro.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CrearOfertaComponent } from './pages/crear-oferta/crear-oferta.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { OfertaFilterComponent } from './pages/ofertafilter/ofertafilter.component';
import { PostService } from './services/post.service';
import { RegistroEmpleadorComponent } from './pages/registro-empleador/registro-empleador.component';
import { RegistroEmpleadoresInicioComponent } from './pages/registro-empleadores-inicio/registro-empleadores-inicio.component';
import { RegistroEmpresaComponent } from './pages/registro-empresa/registro-empresa.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    FiltroComponent,
    PerfilComponent,
    CrearOfertaComponent,
    RegistroComponent,
    CategoriaComponent,
    OfertaFilterComponent,
    RegistroEmpleadorComponent,
    RegistroEmpleadoresInicioComponent,
    RegistroEmpresaComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    MatMenuModule
  ],
  providers: [
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

