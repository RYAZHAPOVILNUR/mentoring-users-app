import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL, API_URL_METERIALS } from './api-url.token';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(API_URL);
  private readonly apiUrlMaterails = inject(API_URL_METERIALS);

  public get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${url}`, {
      headers: this.headers,
      params,
    });
  }

  public post<T, D>(url: string, data?: D): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${url}`, JSON.stringify(data), {
      headers: this.headers,
    });
  }

  public put<T, D>(url: string, data: D): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${url}`, JSON.stringify(data), {
      headers: this.headers,
    });
  }

  public delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${url}`, {
      headers: this.headers,
    });
  }

  public getMaterials<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${this.apiUrlMaterails}${url}`, {
      headers: this.headers,
      params,
    });
  }

  public postMaterials<T, D>(url: string, data?: D): Observable<T> {
    const some = this.http.post<T>(`${this.apiUrlMaterails}${url}`, data, {
      headers: this.headers,
    });
    console.log(some);

    return some
  }

  public putMaterials<T, D>(url: string, data: D): Observable<T> {
    return this.http.put<T>(`${this.apiUrlMaterails}${url}`, JSON.stringify(data), {
      headers: this.headers,
    });
  }

  public deleteMaterials<T>(url: string, data: number): Observable<T> {
    return this.http.delete<T>(`${this.apiUrlMaterails}${url}/${data}`, {
      headers: this.headers,
    });
  }

  private get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return new HttpHeaders(headersConfig);
  }
}
