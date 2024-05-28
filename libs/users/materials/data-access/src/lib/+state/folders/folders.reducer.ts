import { LoadingStatus } from '@users/core/data-access';
import { Folder, FolderErrors } from '../../models/folders.interface';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { MaterialsFoldersAction } from './folders.actions';

export const FOLDERS_FEATURE_KEY = 'folders';

export interface FoldersState extends EntityState<Folder> {
  status: LoadingStatus;
  error: FolderErrors | null;
}
export const foldersAdapter: EntityAdapter<Folder> = createEntityAdapter<Folder>();

export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  error: null,
  status: 'init',
});

export const foldersReducer = createReducer(
  initialFoldersState,
  on(MaterialsFoldersAction.loadFolders, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsFoldersAction.loadFoldersSuccess, (state, { folders }) =>
    foldersAdapter.setAll(folders, { ...state, status: 'loaded' as const })
  ),
  on(MaterialsFoldersAction.loadFoldersFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(MaterialsFoldersAction.deleteFolderSuccess, (state, { id }) => foldersAdapter.removeOne(id, { ...state })),
  on(MaterialsFoldersAction.createFolderSuccess, (state, { folder }) => foldersAdapter.addOne(folder, { ...state }))
);
