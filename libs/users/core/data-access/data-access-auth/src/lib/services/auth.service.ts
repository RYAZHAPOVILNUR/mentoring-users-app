import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of, tap } from 'rxjs';

import { NotificationService } from '@shared/util-notification';
import { userAdapter, UserEntity } from '@users/shared/data-access-models';

import { AuthApiService } from './auth-api.service';
import {
  ChangePasswordPayload,
  ChangePasswordResponse,
  ChangeProfileDataPayload,
  NewUser,
  RegisterResponse,
  SignAuthPayload,
  SignAuthUser,
} from '../models/sign.auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authApiService = inject(AuthApiService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);

  login(data: SignAuthPayload): Observable<SignAuthUser> {
    return this.authApiService.login(data).pipe(
      map((res) => {
        const userEntity = userAdapter.DTOtoEntity(res.user);
        localStorage.setItem('jwtToken', res.authToken);
        return { ...res, user: userEntity };
      }),
    );
  }

  getUser(): Observable<UserEntity> {
    return this.authApiService.getUser().pipe(
      map((userDTO) => {
        return userAdapter.DTOtoEntity(userDTO);
      }),
    );
  }

  register(user: NewUser): Observable<RegisterResponse> {
    return this.authApiService.register(user).pipe(
      tap(() => {
        this.notificationService.show('Register successful!');
      }),
    );
  }

  changePassword(data: ChangePasswordPayload): Observable<ChangePasswordResponse> {
    return this.authApiService.changePassword(data).pipe(
      tap((res) => {
        this.notificationService.show(res.message);
      }),
    );
  }

  resetState(message?: string) {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
    if (message) {
      this.notificationService.show(message);
    }
  }

  changeProfileData(data: ChangeProfileDataPayload) {
    return of(data).pipe(
      tap(() => {
        this.notificationService.show("We can't change profile data yet");
      }),
    );
  }
}
