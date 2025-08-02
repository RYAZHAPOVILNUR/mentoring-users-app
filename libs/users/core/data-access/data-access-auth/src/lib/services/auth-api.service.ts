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

  login(userData: SignAuthPayload) {
    return this.apiService.post<SignAuthResponse, SignAuthPayload>('/auth/login', userData);
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uploadImage(image: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.apiService.post<UserDTO, any>('/users/upload/image', { image });
  }
}
