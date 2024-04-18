import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

import { MaterialsActions } from './materials.actions';
import { Folder } from '../models/folder.interface';
import { Material } from '../models/material.interface';
import { MaterialStatus } from '../enums/materials-status.enum';

export const MATERIALS_FEATURE_KEY = 'materials';

type FolderState = EntityState<Folder>;

type MaterailState = EntityState<Material>;

export const folderAdapter = createEntityAdapter<Folder>();

export const materialAdapter = createEntityAdapter<Material>();

export interface MaterialsState {
  folders: FolderState;
  materials: MaterailState;
  status: MaterialStatus;
  error: Error | null;
}

const initialState: MaterialsState = {
  folders: folderAdapter.getInitialState(),
  materials: materialAdapter.getInitialState(),
  status: MaterialStatus.Init,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(MaterialsActions.loadFolders, (state) => ({
    ...state,
    status: MaterialStatus.Loading,
  })),
  on(MaterialsActions.loadFoldersSuccess, (state, action) => ({
    ...state,
    folders: folderAdapter.setAll(action.folders, state.folders),
    status: MaterialStatus.Loaded,
  })),
  on(MaterialsActions.loadFoldersFailure, (state, action) => ({
    ...state,
    status: MaterialStatus.Error,
    error: action.error,
  })),

  on(MaterialsActions.createFolderSuccess, (state, { folder }) => ({
    ...state,
    folders: folderAdapter.addOne(folder, state.folders),
  }))
);

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer,
});
