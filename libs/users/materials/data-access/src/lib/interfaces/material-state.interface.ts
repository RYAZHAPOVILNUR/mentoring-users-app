import { EntityState } from '@ngrx/entity';
import { LoadingStatus } from '@users/core/data-access';
import { MaterialInterface } from './material.interface';

export interface MaterialStateInterface extends EntityState<MaterialInterface> {
  status: LoadingStatus;
}
