import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {BaseApiService} from './base-api.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {LocalStorageService} from './localstorage.service';
import {FAVORITE_STORAGE_KEY, TOKEN_STORAGE_KEY} from '../constants/localstorage.constant';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface UserInfo {
  sub: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApiService{
  private localStorageService = inject(LocalStorageService);
  private jwtHelper = new JwtHelperService();
  private resource = 'auth/login';


  login(credentials: LoginCredentials): Observable<UserInfo> {
    return this.post<AuthResponse,LoginCredentials>(this.resource, credentials).pipe(
      map(response => {
        const decodedToken = this.jwtHelper.decodeToken(response.token);
        this.localStorageService.set(TOKEN_STORAGE_KEY, response.token);
        return {
          sub: decodedToken.sub,
          name: decodedToken.user
        };
      })
    );
  }

  logout(): void {
    this.localStorageService.remove(TOKEN_STORAGE_KEY);
    this.localStorageService.remove(FAVORITE_STORAGE_KEY)
  }

  isAuthenticated(): boolean {
    const token =  this.localStorageService.get(TOKEN_STORAGE_KEY);
    return token !== null
  }

  getUserInfo(): UserInfo | null {
    const token = this.localStorageService.get(TOKEN_STORAGE_KEY) as string;
    if (!token) return null;

    const decodedToken = this.jwtHelper.decodeToken(token);

    return {
      sub: decodedToken.sub,
      name: decodedToken.user
    };
  }
}
