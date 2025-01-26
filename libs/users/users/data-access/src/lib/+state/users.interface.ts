import { EntityState } from '@ngrx/entity';
import { LoadingStatus, UsersEntity } from '@users/core/data-access';
import { UsersErrors } from './users.type';
import { USERS_FEATURE_KEY } from './users.reducer';

export interface UsersState extends EntityState<UsersEntity> {
  selectedId?: string | number; // which Users record has been selected
  status: LoadingStatus;
  error: UsersErrors | null;
  usersFilter: { name: string };
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}
