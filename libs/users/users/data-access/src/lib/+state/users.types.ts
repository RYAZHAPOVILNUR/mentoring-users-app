import { UsersEntity } from '@users/core/data-access';
import { Optional } from '@angular/core';

export type UsersFilters = Partial<UsersEntity> | Optional;
