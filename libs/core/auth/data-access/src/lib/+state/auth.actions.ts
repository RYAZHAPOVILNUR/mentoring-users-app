import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  NewUser,
  SignAuthPayload,
  SignAuthUser,
  ChangePasswordPayload,
  ChangePasswordResponse,
  ChangeProfileDataPayload,
  ChangeProfileDataResponse,
} from './sign.auth.model';
import { UsersEntity } from '@users/core/data-access';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    changeProfileDataSuccess: props<{ res: ChangeProfileDataResponse }>(),
    changePasswordSuccess: props<{ res: ChangePasswordResponse }>(),
    uploadImageSuccess: props<{ user: UsersEntity }>(),
    registerSuccess: props<{ authToken: string }>(),
    getUserSuccess: props<{ user: UsersEntity }>(),
    loginSuccess: props<{ res: SignAuthUser }>(),

    changeProfileData: props<{ data: ChangeProfileDataPayload }>(),
    changePassword: props<{ data: ChangePasswordPayload }>(),
    uploadImage: props<{ image: any }>(),
    register: props<{ userData: NewUser }>(),
    getUser: emptyProps(),
    logout: emptyProps(),
    login: props<{ userData: SignAuthPayload }>(),

    changeProfileDataFailure: props<{ error: Error }>(),
    changePasswordFailure: props<{ error: Error }>(),
    uploadImageFailure: props<{ error: Error }>(),
    registerFailure: props<{ error: Error }>(),
    getUserFailure: props<{ error: Error }>(),
    loginFailure: props<{ error: Error }>(),
  },
});
