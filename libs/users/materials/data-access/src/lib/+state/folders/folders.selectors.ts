import { FOLDERS_FEATURE_KEY, foldersSelector } from './folders.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';
import { Folder } from '../../interfaces/folder.interface';
import { LoadingStatus, selectRouteParams } from '@users/core/data-access';

const { selectAll, selectEntities } = foldersSelector.getSelectors();

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

export const selectFolderById = createSelector(
  selectRouteParams,
  selectFolders,
  ({ id }, folders) =>
    folders.find((folder) =>
      folder.id === Number(id)
    )
);