import { HttpErrorResponse } from '@angular/common/http';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { LoadingStatus } from '@shared/util-store';

import { FoldersActions } from './folders.actions';
import { Folder } from '../interface/folders.interface';

export const FOLDERS_FEATURE_KEY = 'folders';

export interface FoldersState extends EntityState<Folder> {
  status: LoadingStatus;
  error: HttpErrorResponse | null;
  selectedId: number | null;
}
export const foldersAdapter: EntityAdapter<Folder> = createEntityAdapter<Folder>();

export const { selectAll, selectEntities } = foldersAdapter.getSelectors();

export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  status: 'init',
  error: null,
  selectedId: null,
});

export const foldersFeature = createFeature({
  name: FOLDERS_FEATURE_KEY,
  reducer: createReducer(
    initialFoldersState,

    on(FoldersActions.loadFolders, (state) => ({
      ...state,
      status: 'loading' as const,
      error: null,
    })),
    on(FoldersActions.loadFoldersSuccess, (state, { folders }) =>
      foldersAdapter.setAll(folders, {
        ...state,
        status: 'loaded' as const,
      }),
    ),
    on(FoldersActions.loadFoldersFailure, (state, { error }) => ({
      ...state,
      error,
      status: 'error' as const,
    })),

    on(FoldersActions.addFolder, (state) => ({
      ...state,
      status: 'loading' as const,
      error: null,
    })),
    on(FoldersActions.addFolderSuccess, (state, { folder }) =>
      foldersAdapter.addOne(folder, {
        ...state,
        status: 'loaded' as const,
      }),
    ),
    on(FoldersActions.addFolderFailure, (state, { error }) => ({
      ...state,
      error,
      status: 'error' as const,
    })),

    on(FoldersActions.deleteFolder, (state) => ({
      ...state,
      status: 'loading' as const,
      error: null,
    })),
    on(FoldersActions.deleteFolderSuccess, (state, { id }) =>
      foldersAdapter.removeOne(id, {
        ...state,
        status: 'loaded' as const,
      }),
    ),
    on(FoldersActions.deleteFolderFailure, (state, { error }) => ({
      ...state,
      error,
      status: 'error' as const,
    })),

    on(FoldersActions.openFolder, (state) => ({
      ...state,
      status: 'loading' as const,
      error: null,
    })),
    on(FoldersActions.openFolderSuccess, (state, { folder }) =>
      foldersAdapter.upsertOne(folder, {
        ...state,
        selectedId: folder.id,
        status: 'loaded' as const,
      }),
    ),
    on(FoldersActions.openFolderFailure, (state, { error }) => ({
      ...state,
      error,
      status: 'error' as const,
    })),
  ),
});
