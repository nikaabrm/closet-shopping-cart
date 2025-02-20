import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService<T> {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

//   getAll(endpoint: string): Observable<T[]> {
//     return this.http.get<T[]>(`${this.apiUrl}/${endpoint}`);
//   }

//   getById(endpoint: string, id: string | number): Observable<T> {
//     return this.http.get<T>(`${this.apiUrl}/${endpoint}/${id}`);
//   }

//   create(endpoint: string, item: T): Observable<T> {
//     return this.http.post<T>(`${this.apiUrl}/${endpoint}`, item);
//   }

//   update(endpoint: string, id: string | number, item: Partial<T>): Observable<T> {
//     return this.http.put<T>(`${this.apiUrl}/${endpoint}/${id}`, item);
//   }

//   delete(endpoint: string, id: string | number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${endpoint}/${id}`);
//   }

//   Categories
getCategories(endpoint: string) {
    return this.http.get<T[]>(`${this.apiUrl}/${endpoint}`);
  }
 
}