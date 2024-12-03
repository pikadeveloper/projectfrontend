import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { lastValueFrom } from 'rxjs';
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
      const loginResponse = await lastValueFrom(this.http.post<LoginResponse>(`${this.api}login/`, { email, password }));
      this._userData = loginResponse;
      const encryptedData = this.encryptData(loginResponse);
      localStorage.setItem('userData', encryptedData);
      this.router.navigateByUrl('inicio');
      return loginResponse.message;
    } catch (error) {
      return 'Usuario o contraseña incorrectos.';
    }
  };

  public logout = async () => {
    this._userData = null;
    this.headers.delete('Authorization');
    localStorage.clear();
    this.router.navigateByUrl('inicio');
  };

  public navigateHome = async () => {
    this.router.navigateByUrl('/inicio')
  }

  public get userData(): UserData | null {
    return this._userData;
  }

  public isLoggedIn = (): boolean => {
    return !!this._userData;
  };
}

  /*
  public isSysAdmin = (): boolean => {
    return this._userData?.type === "sysadmin"
  }

  public isAdmin = (): boolean => {
    return this._userData?.type === "admin"
  }
  */

