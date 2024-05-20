import { EntityState } from '@ngrx/entity';
import { LoadingStatus } from '@users/core/data-access';
import { Folder } from './folder.interface';

export interface FolderState extends EntityState<Folder> {
  status: LoadingStatus;
}
