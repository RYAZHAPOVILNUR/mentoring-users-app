import { EntityState } from '@ngrx/entity';
import { LoadingStatus } from '@users/core/data-access';
import { Material } from './material.interface';

export interface MaterialState extends EntityState<Material> {
  status: LoadingStatus;
}
