import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {  NewUser, SignAuthPayload, SignAuthUser } from './sign.auth.model';
import { UsersEntity } from '@users/users/data-access';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    login: props<{ userData: SignAuthPayload }>(),
    loginFailure: props<{ error: Error }>(),
    loginSuccess: props<{ res: SignAuthUser }>(),
    getUser: emptyProps(),
    getUserFailure: props<{ error: Error }>(),
    getUserSuccess: props<{ user: UsersEntity }>(),
    register: props<{userData: NewUser}>(),
    registerFailure: props<{ error: Error }>(),
    registerSuccess: props<{ authToken: string }>(),
    logout: emptyProps(),
  }
});
