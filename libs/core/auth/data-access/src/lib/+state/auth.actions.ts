
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SignAuthPayload, SignAuthResponse } from './sign.auth.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    login: props<{ userData: SignAuthPayload }>(),
    loginFailure: props<{ error: Error }>(),
    loginSuccess: props<{ user: SignAuthResponse }>(),


  }
});
