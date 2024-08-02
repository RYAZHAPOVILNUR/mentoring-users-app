import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { LoadingStatus } from '@users/core/data-access';
import { FolderType } from '../models/folder.type';
import { createFeature, createReducer, on } from '@ngrx/store';
import { foldersActions } from './folders.actions';

export const FOLDERS_FEATURE_KEY = 'folders';
export const foldersAdapter: EntityAdapter<FolderType> = createEntityAdapter();

export interface FoldersState extends EntityState<FolderType> {
  status: LoadingStatus;
  error: Error | null;
}

export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  status: 'init',
  error: null,
});

export const foldersFeature = createFeature({
  name: FOLDERS_FEATURE_KEY,
  reducer: createReducer(
    initialFoldersState,
    on(foldersActions.loadFolders, (state) => {
      return {
        ...state,
        status: 'loading' as const,
      };
    }),
    on(foldersActions.loadFoldersSuccess, (state, { folders }) => {
      return foldersAdapter.setAll(folders, {
        ...state,
        status: 'loaded' as const,
      });
    }),
    on(foldersActions.loadFoldersFailed, (state, { error }) => {
      return {
        ...state,
        status: 'error' as const,
        error,
      };
    }),
    on(foldersActions.addFolders, (state) => {
      return {
        ...state,
        status: 'loading' as const,
      };
    }),
    on(foldersActions.addFoldersSuccess, (state, { folder }) => {
      return foldersAdapter.addOne(folder, {
        ...state,
        status: 'loaded' as const,
      });
    }),
    on(foldersActions.addFoldersFailed, (state, { error }) => {
      return {
        ...state,
        status: 'error' as const,
        error,
      };
    }),
    on(foldersActions.deleteFolders, (state) => {
      return {
        ...state,
        status: 'loading' as const,
      };
    }),
    on(foldersActions.deleteFoldersSuccess, (state, { id }) => {
      return foldersAdapter.removeOne(id, {
        ...state,
        status: 'loaded' as const,
      });
    }),
    on(foldersActions.deleteFoldersFailed, (state, { error }) => {
      return {
        ...state,
        status: 'error' as const,
        error,
      };
    })
  ),
});
