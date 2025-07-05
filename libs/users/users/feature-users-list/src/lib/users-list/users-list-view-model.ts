import { HttpErrorResponse } from '@angular/common/http';

import { LoadingStatus } from '@shared/util-store';
import { DeepReadonly } from '@shared/util-typescript';
import { UsersEntity } from '@users/core/data-access-models';

import { UsersVM } from '../users-vm';

export type UsersListVM = DeepReadonly<{
  users: UsersVM[];
  status: LoadingStatus;
  errors: HttpErrorResponse | null;
  loggedUser: UsersEntity;
}>;
