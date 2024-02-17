import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, createFeature } from '@ngrx/store';

import { LoadingStatus } from '@users/core/data-access';
import { foldersActions, materialsActions } from './materials.actions';
import { Folder } from '../models/folder.model';
import { Material } from '../models/material.model';

export const MATERIALS_FEATURE_KEY = 'materials';

export const foldersAdapter: EntityAdapter<Folder> = createEntityAdapter<Folder>();
export const materialsAdapter: EntityAdapter<Material> = createEntityAdapter<Material>();
export interface FoldersState extends EntityState<Folder>{}
export interface MaterialsState extends EntityState<Material>{}

export interface MaterialsFeatureState {
  materials: MaterialsState;
  folders: FoldersState;
  selectedFolder: Folder | null;
  status: LoadingStatus;
  error: null | Error;
}

export const initialState: MaterialsFeatureState = {
  materials: materialsAdapter.getInitialState(),
  folders: foldersAdapter.getInitialState(),
  selectedFolder: null,
  status: 'init',
  error: null
}

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(foldersActions.loadFolders, (state: MaterialsFeatureState) => ({
      ...state,
      selectedFolder: null,
      status: 'loading' as LoadingStatus
    })),
    on(foldersActions.loadFoldersSuccess, (state: MaterialsFeatureState, { folders }) => ({
        ...state,
        folders: foldersAdapter.setAll(folders, state.folders),
        status: 'loaded' as LoadingStatus
      }
    )),
    on(foldersActions.loadFoldersFailed, (state: MaterialsFeatureState, { error }) => ({
      ...state,
      status: 'error' as LoadingStatus,
      error: error
    })),
    on(foldersActions.createFolderSuccess, (state: MaterialsFeatureState, { folder }) => ({
      ...state,
      folders: foldersAdapter.addOne(folder, state.folders)
    })),
    on(foldersActions.loadCurrentFolderSuccess, (state, { folder }) => ({
      ...state,
      selectedFolder: folder
    })),
    on(materialsActions.loadMaterials, (state: MaterialsFeatureState) => ({
      ...state,
      status: 'loading' as LoadingStatus
    })),
    on(materialsActions.loadMaterialsSuccess, (state: MaterialsFeatureState, { materials }) => ({
      ...state,
      materials: materialsAdapter.setAll(materials, state.materials),
      status: 'loaded'
    }))
  )
});
