import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { UserDTO, UserEntity } from '@users/shared/data-access-models';

import { API_URL } from './api-url.token';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(API_URL);

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

  updateStoryPoints(id: number, updatedUserData: Partial<UserEntity>): Observable<UserEntity> {
    return this.http.post<UserDTO>(`${this.apiUrl}/users/${id}`, updatedUserData).pipe(
      map((userDto) => ({
        ...userDto,
        isAdmin: updatedUserData.isAdmin ?? null,
      })),
    );
  }
  private get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    return new HttpHeaders(headersConfig);
  }
}
