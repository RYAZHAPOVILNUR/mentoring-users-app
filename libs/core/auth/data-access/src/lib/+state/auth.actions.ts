import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoggedInUser, SignAuthPayload, SignAuthResponse } from './sign.auth.model';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    login: props<{ userData: SignAuthPayload }>(),
    loginFailure: props<{ error: Error }>(),
    loginSuccess: props<{ res: SignAuthResponse }>(),
    getUser: emptyProps(),
    getUserFailure: props<{ error: Error }>(),
    getUserSuccess: props<{ user: LoggedInUser }>(),
  }
});
