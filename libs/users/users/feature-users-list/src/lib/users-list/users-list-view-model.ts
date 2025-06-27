import { HttpErrorResponse } from '@angular/common/http';

import { LoadingStatus, UsersEntity } from '@users/core/data-access';
import { DeepReadonly } from '@users/core/utils';

import { UsersVM } from '../users-vm';

export type UsersListVM = DeepReadonly<{
  users: UsersVM[];
  status: LoadingStatus;
  errors: HttpErrorResponse | null;
  loggedUser: UsersEntity;
}>;
