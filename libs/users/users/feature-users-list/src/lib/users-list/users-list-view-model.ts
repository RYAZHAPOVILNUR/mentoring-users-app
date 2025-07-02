import { HttpErrorResponse } from '@angular/common/http';

import { LoadingStatus } from '@shared/util-store';
import { UsersEntity } from '@users/core/data-access-models';
import { DeepReadonly } from '@users/core/utils';

import { UsersVM } from '../users-vm';

export type UsersListVM = DeepReadonly<{
  users: UsersVM[];
  status: LoadingStatus;
  errors: HttpErrorResponse | null;
  loggedUser: UsersEntity;
}>;
