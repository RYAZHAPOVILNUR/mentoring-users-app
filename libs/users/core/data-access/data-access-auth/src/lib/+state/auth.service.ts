import { inject, Injectable } from '@angular/core';

import { ApiService } from '@core/data-access-api';
import { UsersDTO } from '@users/core/data-access-models';

import { SignAuthPayload, SignAuthResponse } from './sign.auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiService = inject(ApiService);

  login(userData: SignAuthPayload) {
    return this.apiService.post<SignAuthResponse, SignAuthPayload>('/auth/login', userData);
  }

  getUser() {
    return this.apiService.get<UsersDTO>('/auth/me');
  }
}
