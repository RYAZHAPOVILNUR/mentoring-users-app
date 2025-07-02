import { HttpErrorResponse } from '@angular/common/http';

import { LoadingStatus } from '@shared/util-store';
import { UsersEntity } from '@users/core/data-access-models';

export type DetailUsersCardVm = {
  editMode: boolean;
  status: LoadingStatus;
  user: UsersEntity | null;
  errors: HttpErrorResponse | null;
};
