import { createFeature, createReducer, on } from '@ngrx/store';
import * as MaterialsFoldersActions from './folders.actions';
import { TFolderEntity } from '../../models/folders/folder.entity';
import { LoadingStatus } from '@users/core/data-access';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TFolderError } from '../../models/folders/folder-error.model';

export const MATERIALS_FOLDERS_FEATURE_KEY = 'materials-folders';

export interface IMaterialsFoldersState extends EntityState<TFolderEntity> {
  status: LoadingStatus;
  error: TFolderError | null;
}

export interface IMaterialsFoldersPartialState {
  readonly [MATERIALS_FOLDERS_FEATURE_KEY]: IMaterialsFoldersState;
}

export const materialsFoldersAdapter: EntityAdapter<TFolderEntity> = createEntityAdapter<TFolderEntity>();

export const initialMaterialsFoldersState: IMaterialsFoldersState = materialsFoldersAdapter.getInitialState({
  status: 'init',
  error: null,
});

export const materialsFoldersFeature = createFeature({
  name: 'materials-folders',
  reducer: createReducer(
    initialMaterialsFoldersState,
    on(MaterialsFoldersActions.loadFolders, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(MaterialsFoldersActions.loadFoldersSuccess, (state, { folders }) =>
      materialsFoldersAdapter.setAll(folders, {
        ...state,
        status: 'loaded' as const,
      })
    ),
    on(MaterialsFoldersActions.loadFoldersFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    })),
    on(MaterialsFoldersActions.deleteFolderSuccess, (state, { id }) =>
      materialsFoldersAdapter.removeOne(id, { ...state })
    ),
    on(MaterialsFoldersActions.deleteFolderFailed, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    })),
    on(MaterialsFoldersActions.addFolderSuccess, (state, { folderData }) =>
      materialsFoldersAdapter.addOne({ ...folderData }, { ...state })
    ),
    on(MaterialsFoldersActions.addFolderFailed, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    })),
    on(MaterialsFoldersActions.loadFolderSuccess, (state, { folder }) =>
      materialsFoldersAdapter.addOne(
        { ...folder },
        {
          ...state,
          status: 'loaded' as const,
        }
      )
    ),
    on(MaterialsFoldersActions.loadFolderFailed, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    }))
  ),
});
