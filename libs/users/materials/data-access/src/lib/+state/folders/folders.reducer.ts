import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, createFeature } from '@ngrx/store';
import { LoadingStatus } from '@users/core/data-access';
import { FoldersEntity } from '../../models/folders.models';
import { folderActions } from './folders.actions';

export const FOLDERS_FEATURE_KEY = 'folders';

export interface FoldersState extends EntityState<FoldersEntity> {
  selectedId: string | number | null;
  status: LoadingStatus;
}

export interface FoldersPartialState {
  readonly [FOLDERS_FEATURE_KEY]: FoldersState;
}

export const foldersAdapter: EntityAdapter<FoldersEntity> = createEntityAdapter<FoldersEntity>();

export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  selectedId: null,
  status: 'init',
});

export const foldersFeature = createFeature({
  name: FOLDERS_FEATURE_KEY,
  reducer: createReducer(
    initialFoldersState,
    on(folderActions.loadFolders, (state) => ({
      ...state,
      status: 'loading' as const,
    })),

    on(folderActions.loadFoldersSuccess, (state, { folders }) =>
      foldersAdapter.setAll(folders, { ...state, status: 'loaded' as const })
    ),

    on(folderActions.loadFoldersFailed, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    })),

    on(folderActions.addFolderSuccess, (state, { folderData }) =>
      foldersAdapter.addOne({ ...folderData }, { ...state })
    ),

    on(folderActions.deleteFolderSuccess, (state, { id }) => foldersAdapter.removeOne(id, { ...state })),

    on(folderActions.loadFolder, (state) => ({
      ...state,
      status: 'loading' as const,
    })),

    on(folderActions.loadFolderSuccess, (state, { folder }) =>
      foldersAdapter.addOne(folder, { ...state, status: 'loaded' as const })
    ),

    on(folderActions.loadFolderFailed, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    }))
  ),
});
