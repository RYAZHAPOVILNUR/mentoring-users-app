import { Action, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { FolderDTO, MaterialDTO } from '../models/types';

export const MATERIALS_FEATURE_KEY = 'materials';
export type MaterialsStatus = 'init' | 'loading' | 'loaded';

export interface MaterialsFeatureState {
  folders: FolderDTO[],
  materials: MaterialDTO[],
  error: any,
  status: MaterialsStatus,
  openedFolder?: FolderDTO,
}

export const initialFoldersState: MaterialsFeatureState = {
  folders: [],
  materials: [],
  error: null,
  status: 'init',
};

const reducer = createReducer(
  initialFoldersState,
  on(MaterialsActions.loadFolders, state => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.loadFoldersSuccess, (state, { folders }) => ({
    ...state,
    folders: folders,
    status: 'loaded' as const,
  })),
  on(MaterialsActions.loadFoldesFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(MaterialsActions.addFolderSuccess, (state, { newFolder }) => ({
    ...state,
    folders: [...state.folders, newFolder],
  })),
  on(MaterialsActions.addFolderFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(MaterialsActions.deleteFolderSuccess, (state, { id }) => ({
    ...state,
    folders: state.folders.filter(folder => folder.id !== id),
  })),
  on(MaterialsActions.deleteFolderFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(MaterialsActions.openFolderSuccess, (state, { id }) => ({
    ...state,
    openedFolder: state.folders.find(folder => folder.id === id),
  })),
  on(MaterialsActions.openFolderFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(MaterialsActions.loadMaterials, state => ({
    ...state,
    status: 'loaded' as const,
  })),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => ({
    ...state,
    materials: materials,
    status: 'loaded' as const,
  })),
  on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(MaterialsActions.addMaterialSuccess, (state, { newMaterial }) => ({
    ...state,
    materials: [...state.materials, newMaterial],
  })),
  on(MaterialsActions.addMaterualFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(MaterialsActions.deleteMaterialSuccess, (state, { id }) => ({
    ...state,
    materials: state.materials.filter(material => material.id !== id),
  })),
  on(MaterialsActions.deleteMaterialFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
)

export function materialReducer(state: MaterialsFeatureState | undefined,
  actions: Action) {
  return reducer(state, actions)
}
