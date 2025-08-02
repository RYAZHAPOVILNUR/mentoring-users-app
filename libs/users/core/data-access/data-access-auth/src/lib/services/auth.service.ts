import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { userAdapter } from '@users/shared/data-access-models';

import { AuthApiService } from './auth-api.service';
import { ChangePasswordPayload, NewUser, SignAuthPayload, SignAuthUser } from '../models/sign.auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authApiService = inject(AuthApiService);

  login(userData: SignAuthPayload): Observable<SignAuthUser> {
    return this.authApiService.login(userData).pipe(
      map((res) => {
        const userEntity = userAdapter.DTOtoEntity(res.user);
        console.log(userEntity);
        return { ...res, user: userEntity };
      }),
    );
  }

  getUser() {
    return this.authApiService.getUser().pipe(
      map((userDTO) => {
        return userAdapter.DTOtoEntity(userDTO);
      }),
    );
  }

  register(user: NewUser) {
    return this.authApiService.register(user);
  }

  changePassword(data: ChangePasswordPayload) {
    return this.authApiService.changePassword(data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uploadImage(image: any) {
    return this.authApiService.uploadImage(image).pipe(
      map((userDTO) => {
        return userAdapter.DTOtoEntity(userDTO);
      }),
    );
  }
}
