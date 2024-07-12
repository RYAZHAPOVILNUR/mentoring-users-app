import { createFeature, createReducer, on } from '@ngrx/store';
import { FoldersActions } from './folders.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { LoadingStatus } from '@users/core/data-access';
import { Folder } from '../../models/folder.model';

export const FOLDERS_FEATURE_KEY = 'folders';
export const foldersAdapter: EntityAdapter<Folder> = createEntityAdapter();

export interface FoldersState extends EntityState<Folder> {
  error: Error | null;
  status: LoadingStatus
}

export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  error: null,
  status: 'init',
});

export const foldersReducer = createReducer(
  initialFoldersState,
  on(FoldersActions.loadFolders, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(FoldersActions.loadFoldersSuccess, (state, { folders }) =>
    foldersAdapter.setAll(folders, {...state, status: 'loaded' as const}),
  ),
  on(FoldersActions.loadFoldersFailure, (state, {error}) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(FoldersActions.addFolder, (state) => ({
    ...state, status: 'loading' as const,
  })),
  on(FoldersActions.addFolderSuccess, (state, {folder}) =>
    foldersAdapter.addOne(folder, {...state, status: 'loaded' as const}),
  ),
  on(FoldersActions.addFolderFailure, (state, {error}) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(FoldersActions.deleteFolder, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(FoldersActions.deleteFolderSuccess, (state, {id}) =>
    foldersAdapter.removeOne(id, {...state, status: 'loaded' as const}),
  ),
  on(FoldersActions.deleteFolderFailure, (state, {error}) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
);

export const foldersFeature = createFeature({
  name: FOLDERS_FEATURE_KEY,
  reducer: foldersReducer,
});
