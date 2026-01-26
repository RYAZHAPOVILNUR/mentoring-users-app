import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserEntity } from '@users/shared/data-access-models';
import { EditUserEntity } from '@users/users/data-access-user';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:RaqAbOVN';

  getUserById(id: number): Observable<UserEntity> {
    return this.http.get<UserEntity>(`${this.apiUrl}/users/${id}`);
  }

  updateUser(id: number, userData: EditUserEntity): Observable<UserEntity> {
    return this.http.post<UserEntity>(`${this.apiUrl}/users/${id}`, userData);
  }
}
