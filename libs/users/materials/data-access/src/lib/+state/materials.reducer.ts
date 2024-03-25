import { Action, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { FolderDTO, MaterialDTO } from '../types'
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export const MATERIALS_FEATURE_KEY = 'materials';
export type MaterialsStatus = 'init' | 'loading' | 'loaded'

// export const materialsAdapter = createEntityAdapter<MaterialDTO>()

export interface MaterialsFeatureState{
  folders: FolderDTO[],
  materials: MaterialDTO[],
  error: any,
  status: MaterialsStatus
}

export const initialFoldersState: MaterialsFeatureState  = {
  folders: [],
  materials: [],
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
    folders: folders,
    status: 'loaded'
  })),
  on(MaterialsActions.loadFoldersFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(MaterialsActions.deleteFolderSuccess, (state, { id }) => ({
    ...state,
    folders: state.folders.filter(folder => folder.id !== id)
  })),
  on(MaterialsActions.deleteFolderFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(MaterialsActions.addFolderSuccess, (state, { newFolder }) => ({
    ...state,
    folders: [...state.folders, newFolder]
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
    materials,
    status: 'loaded'
  })),
  on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(MaterialsActions.deleteMaterialSuccess, (state, { id }) => ({
    ...state,
    materials: state.materials.filter(material => material.id !== id)
  })),
  on(MaterialsActions.deleteMaterialFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(MaterialsActions.addMaterialSuccess, (state, { newMaterial }) => ({
      ...state,
    materials: [...state.materials, newMaterial]
  })),
  on(MaterialsActions.addMaterialFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
);

export function materialsReducer(state: MaterialsFeatureState | undefined, action: Action) {
  return reducer(state, action);
}
