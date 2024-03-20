import { Action, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { FolderDTO, MaterialDTO } from '../types'
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export const MATERIALS_FEATURE_KEY = 'materials';
export type MaterialsStatus = 'init' | 'loading' | 'loaded'

export const materialsAdapter = createEntityAdapter<MaterialDTO>()

export interface MaterialsFeatureState extends EntityState<MaterialDTO>{
  folders: FolderDTO[],
  error: any,
  status: MaterialsStatus,
  revealedFolder?: FolderDTO
}
const localStorageRevealedFolder = localStorage.getItem('revealedFolder');
const revealedFolder = localStorageRevealedFolder ? JSON.parse(localStorageRevealedFolder) : undefined;
export const initialFoldersState: MaterialsFeatureState = materialsAdapter.getInitialState({
  folders: [],
  error: null,
  status: 'init',
  revealedFolder
});

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
    ...materialsAdapter.setAll(materials, { ...state, status: 'loaded'}),
  })),
  on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(MaterialsActions.deleteMaterialSuccess, (state, { id }) => ({
    ...materialsAdapter.removeOne(id, { ...state })
  })),
  on(MaterialsActions.deleteMaterialFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(MaterialsActions.addMaterialSuccess, (state, { newMaterial }) => ({
      ...materialsAdapter.addOne(newMaterial, { ...state })
  })),
  on(MaterialsActions.addMaterialFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(MaterialsActions.revealFolder, (state, { id }) => ({
    ...state,
    revealedFolder: state.folders.find(folder => folder.id === id)
  }))
);

export function materialsReducer(state: MaterialsFeatureState | undefined, action: Action) {
  return reducer(state, action);
}
