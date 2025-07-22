import { inject, Injectable } from '@angular/core';

import { ApiService } from '@core/data-access-api';
import { UsersDTO } from '@users/core/data-access-models';

import {
  ChangePasswordPayload,
  ChangePasswordResponse,
  NewUser,
  RegisterResponse,
  SignAuthPayload,
  SignAuthResponse
} from './sign.auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiService = inject(ApiService);

  login(userData: SignAuthPayload) {
    return this.apiService.post<SignAuthResponse, SignAuthPayload>('/auth/login', userData);
  }

  register(userData: NewUser) {
    return this.apiService.post<RegisterResponse, NewUser>('/auth/signup', userData);
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
}
