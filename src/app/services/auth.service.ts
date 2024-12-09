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
  private headers: HttpHeaders = new HttpHeaders();
  private api = environment.API;
  private secretKey = environment.SECRET_KEY;

  private _userData: UserData | null = null;

  // BehaviorSubject para el estado de autenticación
  // Inicializamos con el estado actual (true si hay datos del usuario, false en caso contrario)
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasUserData());
  public loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient, public router: Router) {
    const encryptedData = localStorage.getItem('userData');
    if (encryptedData) {
      try {
        this._userData = this.decryptData(encryptedData);
      } catch (e) {
        console.error('Error al descifrar los datos del usuario:', e);
        localStorage.removeItem('userData');
      }
    }
    this.headers.set('Content-Type', 'application/json');
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

  public signup = async (cuenta: any) => {
    try {
      const response = await lastValueFrom(this.http.post<AuthResData>(`${this.api}signup/`, cuenta));
      return response;
    } catch (error: any) {
      console.error('Error del servidor:', error);
      return { message: 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.' };
    }
  };

  public login = async (email: string, password: string) => {
    try {
      const loginResponse = await lastValueFrom(
        this.http.post<LoginResponse>(`${this.api}login/`, { email, password })
      );

      if (loginResponse) {
        this._userData = loginResponse.data;
        const encryptedData = this.encryptData(loginResponse);
        localStorage.setItem('userData', encryptedData);

        // Emitir el nuevo estado de loggedInSubject
        this.loggedInSubject.next(true);

        this.router.navigateByUrl('inicio');
        return { success: true, message: loginResponse.message };
      } else {
        return { success: false, message: 'Respuesta inválida del servidor' };
      }
    } catch (error: any) {
      const errorMessage = error.error?.message || 'Usuario o contraseña incorrectos.';
      return { success: false, message: errorMessage };
    }
  };

  public logout = async () => {
    this._userData = null;
    this.headers.delete('Authorization');
    localStorage.clear();
    // Emitir el nuevo estado (no logueado)
    this.loggedInSubject.next(false);
    this.router.navigateByUrl('inicio');
  };

  public navigateHome = async () => {
    this.router.navigateByUrl('/inicio')
  }

  public get userData(): UserData | null {
    return this._userData;
  }

  public isLoggedIn = (): boolean => {
    return this._userData != null;
  };

  public isEmployer = (): boolean => {
    return !!this._userData?.isEmployer;
  };
}
