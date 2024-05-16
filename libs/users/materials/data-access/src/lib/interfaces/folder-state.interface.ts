import { EntityState } from '@ngrx/entity';
import { LoadingStatus } from '@users/core/data-access';
import { FolderInterface } from './folder.interface';

export interface FolderStateInterface extends EntityState<FolderInterface> {
  status: LoadingStatus;
}
