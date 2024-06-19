import { FOLDERS_FEATURE_KEY, foldersAdapter } from './folders.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';
import { Folder } from '../../interfaces/folder.interface';
import { LoadingStatus } from '@users/core/data-access';

const { selectAll, selectEntities } = foldersAdapter.getSelectors();

interface FolderState extends EntityState<Folder> {
  status: LoadingStatus;
}

export const selectFoldersState = createFeatureSelector<FolderState>(
  FOLDERS_FEATURE_KEY
);
export const selectFolders = createSelector(
  selectFoldersState,
  (state) => selectAll(state)
);
export const selectFoldersStatus = createSelector(
  selectFoldersState, (state) => state.status
);

export const selectFoldersEntities = createSelector(
  selectFoldersState,
  (state) => selectEntities(state)
);

