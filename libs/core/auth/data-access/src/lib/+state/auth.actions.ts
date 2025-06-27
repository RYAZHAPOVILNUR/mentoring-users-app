import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { UsersEntity } from '@users/core/data-access';

import {
  ChangePasswordPayload,
  ChangePasswordResponse,
  ChangeProfileDataPayload,
  ChangeProfileDataResponse,
  NewUser,
  SignAuthPayload,
  SignAuthUser,
} from './sign.auth.model';

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
