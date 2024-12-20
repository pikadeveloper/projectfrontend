import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { lastValueFrom, BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { LoginResponse, UserData } from '../interfaces/login';
import { AuthResData } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = environment.API+"accounts/";
  private secretKey = environment.SECRET_KEY;

  private _userData: UserData | null = null;

  // BehaviorSubject para el estado de autenticación
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasUserData());
  public loggedIn$ = this.loggedInSubject.asObservable();

    // Estado de si es empleador
    private isEmployerSubject = new BehaviorSubject<boolean>(this.isEmployer());
    public isEmployer$ = this.isEmployerSubject.asObservable();

    // Estado de si ya tiene empresa
    private hasEmpresaSubject = new BehaviorSubject<boolean>(this.hasEmpresa());
    public hasEmpresa$ = this.hasEmpresaSubject.asObservable();


  constructor(private http: HttpClient, private router: Router) {
    const encryptedData = localStorage.getItem('userData');
    if (encryptedData) {
      try {
        this._userData = this.decryptData(encryptedData);
      } catch (e) {
        console.error('Error al descifrar los datos del usuario:', e);
        localStorage.removeItem('userData');
      }
    }
    this.isEmployerSubject.next(this.isEmployer());
    this.hasEmpresaSubject.next(this.hasEmpresa());
  }

  private encryptData(data: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
  }

  private decryptData(encryptedData: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  private hasUserData(): boolean {
    return !!localStorage.getItem('userData');
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public isEmployer(): boolean {
    return !!this._userData?.is_employer;
  }

  public hasEmpresa(): boolean {
    // Por ejemplo, si guardas en localStorage este valor tras crear una empresa
    return localStorage.getItem('hasEmpresa') === 'true';
  }

  signup(userData: any): Observable<any> {
    return this.http.post<any>(`${this.api}signup/`, userData);
  }
  // public async signup(cuenta: any):Promise<Observable<any>> {
  //   return new Observable(observer => {
  //     this.http.post<AuthResData>(`${this.api}signup/`, cuenta).subscribe({
  //       next: response => observer.next(response),
  //       error: error => {
  //         console.error('Error del servidor:', error);
  //         observer.next({ message: 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.' });
  //       }
  //     });
  //   });
  // }

  public async registerEmployer(cuenta: any) {
    try {
      const response = await lastValueFrom(this.http.post<AuthResData>(`${this.api}register/employer/`, cuenta));
      if (response && response.success) {
        // Si el registro es exitoso, actualizas userData si es necesario
        // y luego emites el cambio en isEmployer
        if (response.is_employer) {
          this._userData = {
            username: response.username || null,
            user_id: response.user_id,
            email: response.email,
            firstname: response.firstname,
            date_joined: response.date_joined,
            last_join: response.last_join,
            is_employer: response.is_employer,
            has_empresa: false  // valor inicial para nuevo empleador
          };
          this.isEmployerSubject.next(true);
          this.hasEmpresaSubject.next(false);
        }
      }
      return response;
    } catch (error: any) {
      console.error('Error registrando empleador:', error);
      return { success: false, message: 'Ocurrió un error al registrar el empleador. Por favor, inténtalo de nuevo más tarde.' };
    }
  }

  // NUEVO: Crear empresa (solo para empleadores logueados)
  // Cuando se crea la empresa, actualizamos el estado de hasEmpresa
  public async createEmpresa(empresaData: any) {
    const token = this.getToken();
    if (!token) {
      return { success: false, message: 'No hay token de autenticación.' };
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    });

    try {
      const response = await lastValueFrom(this.http.post(`${environment.API}empresa/`, empresaData, { headers }));

      // Suponemos que si la respuesta es exitosa, ya tenemos empresa
      // Guardar un indicador en localStorage
      localStorage.setItem('hasEmpresa', 'true');
      this.hasEmpresaSubject.next(true);

      return { success: true, data: response };
    } catch (error: any) {
      console.error('Error al crear la empresa:', error);
      return { success: false, message: 'Ocurrió un error al crear la empresa.' };
    }
  }

  // Login (para cualquier tipo de usuario, ya existente)
  public async login(email: string, password: string) {
    try {
      const loginResponse = await lastValueFrom(
        this.http.post<LoginResponse>(`${this.api}login/`, { email, password })
      );

      if (loginResponse) {
        const token = loginResponse.token;

        const userData: UserData = {
          email: loginResponse.email,
          firstname: loginResponse.firstname,
          username: loginResponse.username,
          user_id: loginResponse.user_id,
          date_joined: loginResponse.date_joined,
          last_join: loginResponse.last_join,
          is_employer: loginResponse.is_employer,
          has_empresa: loginResponse.has_empresa
        };

        // Encriptar y guardar userData
        const encryptedData = this.encryptData(userData);
        localStorage.setItem('userData', encryptedData);
        localStorage.setItem('token', token);


        if (loginResponse.is_employer) {
          if (loginResponse.has_empresa) {
            localStorage.setItem('hasEmpresa', 'true');
          } else {
            localStorage.removeItem('hasEmpresa');
          }
        } else {
          localStorage.removeItem('hasEmpresa');
        }

        this._userData = userData;
        this.loggedInSubject.next(true);
        this.isEmployerSubject.next(this.isEmployer());
        // Si ya tienes el estado de la empresa guardado, podrías chequearlo:
        this.hasEmpresaSubject.next(this.hasEmpresa());
        if (this.isEmployerSubject.value === true) {
          if (loginResponse.has_empresa) {
            localStorage.setItem('hasEmpresa', 'true');
          } else {
            localStorage.removeItem('hasEmpresa');
          }
          this.hasEmpresaSubject.next(this.hasEmpresa());
        } else {

        }
        this.router.navigateByUrl('inicio');
        // Devolver un mensaje fijo, ya que la respuesta no trae "message"
        return { success: true, message: 'Inicio de sesión exitoso' };
      } else {
        return { success: false, message: 'Respuesta inválida del servidor' };
      }
    } catch (error: any) {
      const errorMessage = error.error?.message || 'Usuario o contraseña incorrectos.';
      return { success: false, message: errorMessage };
    }
  }

  // Cerrar sesión
  public async logout() {
    this._userData = null;
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    this.loggedInSubject.next(false);
    this.router.navigateByUrl('inicio');
  }

  public async navigateHome() {
    this.router.navigateByUrl('/inicio');
  }

  public get userData(): UserData | null {
    return this._userData;
  }

  public isLoggedIn(): boolean {
    return this._userData != null;
  }


}
