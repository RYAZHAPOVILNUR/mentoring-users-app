import { HttpErrorResponse } from '@angular/common/http';

import { LoadingStatus, UsersEntity } from '@users/core/data-access';

export type DetailUsersCardVm = {
  editMode: boolean;
  status: LoadingStatus;
  user: UsersEntity | null;
  errors: HttpErrorResponse | null;
};
