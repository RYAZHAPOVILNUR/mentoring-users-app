import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { Folder } from '../models/folder.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { LoadingStatus } from '@users/core/data-access';

export const MATERIALS_FEATURE_KEY = 'materials';

export const foldersAdapter: EntityAdapter<Folder> = createEntityAdapter<Folder>();

export type FoldersState = EntityState<Folder>;

export interface MaterialsFeatureState {
  folders: FoldersState;
  status: LoadingStatus;
  error: null | Error;
}

export const initialMaterialsState: MaterialsFeatureState = {
  folders: foldersAdapter.getInitialState(),
  status: 'init',
  error: null,
};

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: createReducer(
    initialMaterialsState,
    on(MaterialsActions.loadFolders, (state) => ({
      ...state,
      status: 'loading',
    })),
    on(MaterialsActions.loadFoldersSuccess, (state, { folders }) => ({
      ...state,
      folders: foldersAdapter.setAll(folders, state.folders),
      status: 'loaded',
    })),
    on(MaterialsActions.loadFoldersFailure, (state, { error }) => ({
      ...state,
      status: 'error',
      error,
    })),

    on(MaterialsActions.addFolderSuccess, (state, { folder }) => ({
      ...state,
      folders: foldersAdapter.addOne(folder, state.folders),
    })),

    on(MaterialsActions.deleteFolderSuccess, (state, { id }) => ({
      ...state,
      folders: foldersAdapter.removeOne(id, state.folders),
    }))
  ),
});
