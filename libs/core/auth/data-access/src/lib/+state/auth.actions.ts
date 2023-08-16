import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { NewUser, SignAuthPayload, SignAuthUser, ChangePasswordPayload, ChangePasswordResponce } from './sign.auth.model';
import { UsersEntity } from '@users/core/data-access';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    login: props<{ userData: SignAuthPayload }>(),
    loginFailure: props<{ error: Error }>(),
    loginSuccess: props<{ res: SignAuthUser }>(),
    getUser: emptyProps(),
    getUserFailure: props<{ error: Error }>(),
    getUserSuccess: props<{ user: UsersEntity }>(),
    register: props<{ userData: NewUser }>(),
    registerFailure: props<{ error: Error }>(),
    registerSuccess: props<{ authToken: string }>(),
    logout: emptyProps(),
    changePassword: props<{ data: ChangePasswordPayload }>(),
    changePasswordFailure: props<{ error: Error }>(),
    changePasswordSuccess: props<{ res: ChangePasswordResponce }>(),
    uploadImage: props<{ image:any}>(),
    uploadImageSuccess: props<{ user: UsersEntity }>(),
    uploadImageFailure: props<{ error: Error }>()
  }
});
