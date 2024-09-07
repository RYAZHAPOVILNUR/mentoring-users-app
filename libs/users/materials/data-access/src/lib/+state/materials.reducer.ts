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
  openedFolder: Folder | null;
}

const initialState: MaterialsState = {
  folders: folderAdapter.getInitialState(),
  materials: materialAdapter.getInitialState(),
  status: MaterialStatus.Init,
  error: null,
  openedFolder: null,
};

export const reducer = createReducer(
  initialState,
  on(MaterialsActions.loadFolders, (state) => ({
    ...state,
    status: MaterialStatus.Loading,
  })),
  on(MaterialsActions.setOpenedFolder, (state, { openedFolder }) => ({
    ...state,
    openedFolder,
  })),
  on(MaterialsActions.loadFoldersSuccess, (state, { folders }) => ({
    ...state,
    folders: folderAdapter.setAll(folders, state.folders),
    status: MaterialStatus.Loaded,
  })),
  on(MaterialsActions.loadFoldersFailure, (state, { error }) => ({
    ...state,
    status: MaterialStatus.Error,
    error,
  })),
  on(MaterialsActions.deleteFolderSuccess, (state, { id }) => ({
    ...state,
    folders: folderAdapter.removeOne(id, state.folders),
  })),
  on(MaterialsActions.deleteFolderFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(MaterialsActions.createFolderSuccess, (state, { folder }) => ({
    ...state,
    folders: folderAdapter.addOne(folder, state.folders),
  })),
  on(MaterialsActions.createFolderFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(MaterialsActions.loadMaterials, (state) => ({
    ...state,
    status: MaterialStatus.Loading,
  })),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => ({
    ...state,
    materials: materialAdapter.setAll(materials, state.materials),
    status: MaterialStatus.Loaded,
  })),
  on(MaterialsActions.createMaterialSuccess, (state, { material }) => ({
    ...state,
    materials: materialAdapter.addOne(material, state.materials),
  })),
  on(MaterialsActions.createMaterialFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(MaterialsActions.deleteMaterialSuccess, (state, { id }) => ({
    ...state,
    materials: materialAdapter.removeOne(id, state.materials),
  })),
  on(MaterialsActions.deleteMaterialFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer,
});
