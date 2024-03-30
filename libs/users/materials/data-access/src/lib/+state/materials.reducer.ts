import { Action, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { FolderDTO, MaterialDTO } from '../types'
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export const MATERIALS_FEATURE_KEY = 'materials';
export type MaterialsStatus = 'init' | 'loading' | 'loaded'

export const foldersAdapter = createEntityAdapter<FolderDTO>();
export const materialsAdapter = createEntityAdapter<MaterialDTO>();

export type FoldersState = EntityState<FolderDTO>;
export type MaterialsState = EntityState<MaterialDTO>;

export interface MaterialsFeatureState {
  folders: FoldersState,
  materials: MaterialsState,
  error: any,
  status: MaterialsStatus
}

export const initialFoldersState: MaterialsFeatureState  = {
  folders: foldersAdapter.getInitialState(),
  materials: materialsAdapter.getInitialState(),
  error: null,
  status: 'init',
};

const reducer = createReducer(
  initialFoldersState,
  on(MaterialsActions.loadFolders, state => ({
    ...state,
    status: 'loading'
  })),
  on(MaterialsActions.loadFoldersSuccess, (state, { folders }) => ({
    ...state,
    folders: foldersAdapter.setAll(folders, state.folders),
    status: 'loaded',
  })),
  on(MaterialsActions.loadFoldersFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(MaterialsActions.deleteFolderSuccess, (state, { id }) => ({
    ...state,
    folders: foldersAdapter.removeOne(id, state.folders)
  })),
  on(MaterialsActions.deleteFolderFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(MaterialsActions.addFolderSuccess, (state, { newFolder }) => ({
    ...state,
    folders: foldersAdapter.addOne(newFolder, state.folders)
  })),
  on(MaterialsActions.addFolderFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(MaterialsActions.loadMaterials, state => ({
    ...state,
    status: 'loading'
  })),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => ({
    ...state,
    materials: materialsAdapter.setAll(materials, state.materials),
    status: 'loaded'
  })),
  on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(MaterialsActions.deleteMaterialSuccess, (state, { id }) => ({
    ...state,
    materials: materialsAdapter.removeOne(id, state.materials)
  })),
  on(MaterialsActions.deleteMaterialFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(MaterialsActions.addMaterialSuccess, (state, { newMaterial }) => ({
    ...state,
    materials: materialsAdapter.addOne(newMaterial, state.materials)
  })),
  on(MaterialsActions.addMaterialFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
);

export function materialsReducer(state: MaterialsFeatureState | undefined, action: Action) {
  return reducer(state, action);
}
