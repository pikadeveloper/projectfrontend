import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { lastValueFrom, BehaviorSubject } from 'rxjs';
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

  // Registro para usuarios normales (ya existente)
  public async signup(cuenta: any) {
    // Endpoint original para registrar usuarios normales
    try {
      const response = await lastValueFrom(this.http.post<AuthResData>(`${this.api}signup/`, cuenta));
      return response;
    } catch (error: any) {
      console.error('Error del servidor:', error);
      return { message: 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.' };
    }
  }

  // NUEVO: Registro para empleadores
  public async registerEmployer(cuenta: any) {
    // Asegúrate que "cuenta" incluya is_employer: true
    // ej: cuenta = { email:..., password:..., firstname:..., is_employer: true }
    try {
      const response = await lastValueFrom(this.http.post<AuthResData>(`${this.api}register/employer/`, cuenta));
      return response;
    } catch (error: any) {
      console.error('Error registrando empleador:', error);
      return { message: 'Ocurrió un error al registrar el empleador. Por favor, inténtalo de nuevo más tarde.' };
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

        // Crear objeto UserData a partir de loginResponse directamente
        const userData: UserData = {
          email: loginResponse.email,
          firstname: loginResponse.firstname,
          username: loginResponse.username,
          user_id: loginResponse.user_id,
          date_joined: loginResponse.date_joined,
          last_join: loginResponse.last_join,
          is_employer: loginResponse.is_employer
        };

        // Encriptar y guardar userData
        const encryptedData = this.encryptData(userData);
        localStorage.setItem('userData', encryptedData);

        // Guardar token
        localStorage.setItem('token', token);

        this._userData = userData;
        this.loggedInSubject.next(true);

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

  public isEmployer(): boolean {
    return !!this._userData?.is_employer;
  }

  // NUEVO: Crear empresa (solo para empleadores logueados)
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
      const response = await lastValueFrom(this.http.post(`${this.api}empresa/`, empresaData, { headers }));
      return { success: true, data: response };
    } catch (error: any) {
      console.error('Error al crear la empresa:', error);
      return { success: false, message: 'Ocurrió un error al crear la empresa.' };
    }
  }
}
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from '../environments/environment';
// import { lastValueFrom, BehaviorSubject } from 'rxjs';
// import { Router } from '@angular/router';
// import * as CryptoJS from 'crypto-js';
// import { LoginResponse, UserData } from '../interfaces/login';
// import { AuthResData } from '../models/auth.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private headers: HttpHeaders = new HttpHeaders();
//   private api = environment.API;
//   private secretKey = environment.SECRET_KEY;

//   private _userData: UserData | null = null;

//   // BehaviorSubject para el estado de autenticación
//   // Inicializamos con el estado actual (true si hay datos del usuario, false en caso contrario)
//   private loggedInSubject = new BehaviorSubject<boolean>(this.hasUserData());
//   public loggedIn$ = this.loggedInSubject.asObservable();

//   constructor(private http: HttpClient, public router: Router) {
//     const encryptedData = localStorage.getItem('userData');
//     if (encryptedData) {
//       try {
//         this._userData = this.decryptData(encryptedData);
//       } catch (e) {
//         console.error('Error al descifrar los datos del usuario:', e);
//         localStorage.removeItem('userData');
//       }
//     }
//     this.headers.set('Content-Type', 'application/json');
//   }

//   private encryptData(data: any): string {
//     return CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
//   }

//   private decryptData(encryptedData: string): any {
//     const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
//     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//   }

//   private hasUserData(): boolean {
//     return !!localStorage.getItem('userData');
//   }

//   public signup = async (cuenta: any) => {
//     try {
//       const response = await lastValueFrom(this.http.post<AuthResData>(`${this.api}signup/`, cuenta));
//       return response;
//     } catch (error: any) {
//       console.error('Error del servidor:', error);
//       return { message: 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.' };
//     }
//   };

//   public login = async (email: string, password: string) => {
//     try {
//       const loginResponse = await lastValueFrom(
//         this.http.post<LoginResponse>(`${this.api}login/`, { email, password })
//       );

//       if (loginResponse) {
//         this._userData = loginResponse.data;
//         const encryptedData = this.encryptData(loginResponse);
//         localStorage.setItem('userData', encryptedData);

//         // Emitir el nuevo estado de loggedInSubject
//         this.loggedInSubject.next(true);

//         this.router.navigateByUrl('inicio');
//         return { success: true, message: loginResponse.message };
//       } else {
//         return { success: false, message: 'Respuesta inválida del servidor' };
//       }
//     } catch (error: any) {
//       const errorMessage = error.error?.message || 'Usuario o contraseña incorrectos.';
//       return { success: false, message: errorMessage };
//     }
//   };

//   public logout = async () => {
//     this._userData = null;
//     this.headers.delete('Authorization');
//     localStorage.clear();
//     // Emitir el nuevo estado (no logueado)
//     this.loggedInSubject.next(false);
//     this.router.navigateByUrl('inicio');
//   };

//   public navigateHome = async () => {
//     this.router.navigateByUrl('/inicio')
//   }

//   public get userData(): UserData | null {
//     return this._userData;
//   }

//   public isLoggedIn = (): boolean => {
//     return this._userData != null;
//   };

//   public isEmployer = (): boolean => {
//     return !!this._userData?.isEmployer;
//   };
// }
