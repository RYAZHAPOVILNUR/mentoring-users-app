import { Injectable, inject } from '@angular/core';
import { AuthStore } from './auth.store';
import { LocalStorageJwtService } from '../services/local-storage-jwt.service';
import { Router } from '@angular/router';
import {
  ChangePasswordPayload,
  ChangePasswordResponse,
  NewUser,
  RegisterResponse,
  SignAuthPayload,
  SignAuthResponse,
} from './sign.auth.model';
import { BehaviorSubject, catchError, firstValueFrom, map, of, take } from 'rxjs';
import { ApiService } from '@users/core/http';
import { UsersDTO, usersDTOAdapter } from '@users/core/data-access';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authSignalStore = inject(AuthStore);
  private readonly localStorageJwtService = inject(LocalStorageJwtService);
  private readonly router = inject(Router);
  private readonly apiService = inject(ApiService);
  public signAuthUser$ = new BehaviorSubject({});

  login(userData: SignAuthPayload) {
    this.authSignalStore.login();
    this.apiService
      .post<SignAuthResponse, SignAuthPayload>('/auth/login', userData)
      .pipe(
        map((signAuthUser) => {
          const userEntity = usersDTOAdapter.DTOtoEntity(signAuthUser.user);
          const updatedRes = { ...signAuthUser, user: userEntity };
          this.authSignalStore.loginSuccess(updatedRes);
          this.localStorageJwtService.setItem(signAuthUser.authToken);
          this.router.navigateByUrl('/profile');
          return updatedRes;
        }),
        catchError((e) => {
          this.authSignalStore.setErrorState(e);
          return of(null);
        }),
        take(1),
      )
      .subscribe();
  }

  getUser() {
    this.localStorageJwtService.getItem() && this.authSignalStore.status() !== 'loaded'
      ? this.apiService
          .get<UsersDTO>('/auth/me')
          .pipe(
            map((userDTO) => {
              this.authSignalStore.getUserSuccess(userDTO);
            }),
            catchError((e) => {
              this.authSignalStore.setErrorState(e);
              return of(null);
            }),
            take(1),
          )
          .subscribe()
      : of();
  }

  register(userData: NewUser) {
    this.apiService
      .post<RegisterResponse, NewUser>('/auth/signup', userData)
      .pipe(
        map((authToken) => {
          this.localStorageJwtService.setItem(authToken.authToken);
          this.router.navigateByUrl('/profile');
          this.getUser();
        }),
        catchError((e) => {
          this.authSignalStore.setErrorState(e);
          return of(null);
        }),
        take(1),
      )
      .subscribe();
  }

  changePassword(data: ChangePasswordPayload) {
    this.apiService
      .put<ChangePasswordResponse, ChangePasswordPayload>('/auth/change_password', data)
      .pipe(
        catchError((e) => {
          this.authSignalStore.setErrorState(e);
          return of(null);
        }),
        take(1),
      )
      .subscribe();
  }

  uploadImage(image: any) {
    this.apiService
      .post<UsersDTO, any>('/users/upload/image', { image })
      .pipe(
        map((userDTO) => {
          this.authSignalStore.uploadImage(userDTO);
        }),
        catchError((e) => {
          this.authSignalStore.setErrorState(e);
          return of(null);
        }),
        take(1),
      )
      .subscribe();
  }

  logout() {
    this.authSignalStore.logout();
    this.localStorageJwtService.removeItem();
    this.router.navigate(['/login']);
    const notDefaultTheme: Element | null = document.head.querySelector('.style-manager-theme');
    if (notDefaultTheme) notDefaultTheme.remove();
  }
}
