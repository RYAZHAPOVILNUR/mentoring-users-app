import { createFeature, createReducer, on } from '@ngrx/store';
import * as MaterialsActions from './folders.actions';
import { TFolderEntity } from '../../models/folders/folder.entity';
import { LoadingStatus } from '@users/core/data-access';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TFolderError } from '../../models/folders/folder-error.model';

export const MATERIALS_FOLDERS_FEATURE_KEY = 'materials';

export interface MaterialsFoldersState extends EntityState<TFolderEntity> {
  status: LoadingStatus;
  error: TFolderError | null;
}

export interface MaterialsPartialState {
  readonly [MATERIALS_FOLDERS_FEATURE_KEY]: MaterialsFoldersState;
}

export const materialsFoldersAdapter: EntityAdapter<TFolderEntity> = createEntityAdapter<TFolderEntity>();

export const initialMaterialsFoldersState: MaterialsFoldersState = materialsFoldersAdapter.getInitialState({
  status: 'init',
  error: null,
});

export const materialsFeature = createFeature({
  name: 'materials',
  reducer: createReducer(
    initialMaterialsFoldersState,
    on(MaterialsActions.loadFolders, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(MaterialsActions.loadFolderSuccess, (state, { folders }) =>
      materialsFoldersAdapter.setAll(folders, {
        ...state,
        status: 'loaded' as const,
      })
    ),
    on(MaterialsActions.loadFolderFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    })),
    on(MaterialsActions.deleteFolderSuccess, (state, { id }) => materialsFoldersAdapter.removeOne(id, { ...state })),
    on(MaterialsActions.deleteFolderFailed, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    })),
    on(MaterialsActions.addFolderSuccess, (state, { folderData }) =>
      materialsFoldersAdapter.addOne({ ...folderData }, { ...state })
    ),
    on(MaterialsActions.addFolderFailed, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    }))
  ),
});
