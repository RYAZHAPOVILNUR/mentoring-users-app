import { inject, Injectable } from '@angular/core';

import { ApiService } from '@core/data-access-api';
import { UserDTO } from '@users/shared/data-access-models';

import {
  ChangePasswordPayload,
  ChangePasswordResponse,
  NewUser,
  RegisterResponse,
  SignAuthPayload,
  SignAuthResponse,
} from '../models/sign.auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly apiService = inject(ApiService);

  login(data: SignAuthPayload) {
    return this.apiService.post<SignAuthResponse, SignAuthPayload>('/auth/login', data);
  }

  getUser() {
    return this.apiService.get<UserDTO>('/auth/me');
  }

  register(user: NewUser) {
    return this.apiService.post<RegisterResponse, NewUser>('/auth/signup', user);
  }

  changePassword(data: ChangePasswordPayload) {
    return this.apiService.put<ChangePasswordResponse, ChangePasswordPayload>('/auth/change_password', data);
  }

  uploadImage(image: unknown) {
    return this.apiService.post<UserDTO, unknown>('/users/upload/image', { image });
  }
}
