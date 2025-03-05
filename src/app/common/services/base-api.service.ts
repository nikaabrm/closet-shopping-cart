import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Product } from '../../shopping-cart/models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService<T> {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll<T>(endpoint: string,params?:Record<string,any>): Observable<T[]> {

    let httpParams = new HttpParams();

    if(params){
      Object.keys(params).forEach((key) => {
        if (params[key]) {
            httpParams = httpParams.append(key, params[key]);
        }
    });
    }
    return this.http.get<T[]>(`${this.apiUrl}/${endpoint}`,{params});
  }

  getById<T>(endpoint: string, id: string | number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}/${id}`);
  }

  create<T>(endpoint: string, item: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, item);
  }

  update<T>(endpoint: string, id: string | number, item: Partial<T>): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}/${id}`, item);
  }

  delete<T>(endpoint: string, id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${endpoint}/${id}`);
  }

 
}