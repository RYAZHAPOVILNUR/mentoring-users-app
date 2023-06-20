import { createActionGroup, props } from '@ngrx/store';
import { SignAuthPayload, SignAuthResponse } from './sign.auth.model';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    login: props<{ userData: SignAuthPayload }>(),
    loginFailure: props<{ error: Error }>(),
    loginSuccess: props<{ res: SignAuthResponse }>()
  }
});
