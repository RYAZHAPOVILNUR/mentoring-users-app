import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  UsersDTO,
  ChangePasswordPayload,
  ChangePasswordResponse,
  NewUser,
  RegisterResponse,
  SignAuthPayload,
  SignAuthResponse,
  usersDTOAdapter,
} from '@users/core/data-access-models';
import { map, switchMap, tap } from 'rxjs';

import { ApiService } from '@core/data-access-api';
import { LocalStorageJwtService } from '@core/data-access-interceptors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiService = inject(ApiService);
  private readonly localStorageJwtService = inject(LocalStorageJwtService);
  router = inject(Router);

  login(userData: SignAuthPayload) {
    return this.apiService.post<SignAuthResponse, SignAuthPayload>('/auth/login', userData).pipe(
      map((res) => {
        const userEntity = usersDTOAdapter.DTOtoEntity(res.user);
        this.localStorageJwtService.setItem(res.authToken);
        this.router.navigateByUrl('/profile');
        return { ...res, user: userEntity };
      }),
    );
  }

  register(userData: NewUser) {
    return this.apiService.post<RegisterResponse, NewUser>('/auth/signup', userData).pipe(
      tap(({ authToken }) => {
        this.localStorageJwtService.setItem(authToken);
        this.router.navigate(['/profile']);
      }),
      switchMap(() => this.getUser()),
    );
  }

  getUser() {
    return this.apiService.get<UsersDTO>('/auth/me');
  }

  changePassword(data: ChangePasswordPayload) {
    return this.apiService.put<ChangePasswordResponse, ChangePasswordPayload>('/auth/change_password', data);
  }

  uploadImage(image: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.apiService.post<UsersDTO, any>('/users/upload/image', { image });
  }

  logout() {
    this.localStorageJwtService.removeItem();
    this.router.navigate(['/login']);
    const notDefaultTheme: Element | null = document.head.querySelector('.style-manager-theme');
    if (notDefaultTheme) notDefaultTheme.remove();
  }
}
