import { createFeature, createReducer, on } from '@ngrx/store';
import { FoldersActions, MaterialsActions } from './materials.actions';
import { IMaterial } from '../models/imaterial';
import { IFolder } from '../models/ifolder';
import { LoadingStatus } from '@users/core/data-access';

export const materialsFeatureKey = 'materials';

export interface State {
  materials: IMaterial[];
  folders: IFolder[];
  status: LoadingStatus; //'init' | 'loading' | 'loaded' | 'error'
}

export const initialState: State = {
  materials: [],
  folders: [],
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  //Folders
  //Load folders
  on(FoldersActions.loadFolders, (state) => ({
    ...state,
    status: 'loading' as LoadingStatus,
  })),
  on(FoldersActions.loadFoldersSuccess, (state, { folders }) =>
    folders ? { ...state, folders, status: 'loaded' as LoadingStatus } : state
  ),
  on(FoldersActions.loadFoldersFailure, (state, { error }) => ({
    ...state,
    status: 'error' as LoadingStatus,
    error,
  })),

  //Create folder
  on(FoldersActions.createFolder, (state) => ({
    ...state,
    status: 'loading' as LoadingStatus,
  })),
  on(FoldersActions.createFolderSuccess, (state, { folder }) => ({
    ...state,
    folders: [...state.folders, folder],
    status: 'loaded' as LoadingStatus,
  })),
  on(FoldersActions.createFolderFailure, (state, { error }) => ({
    ...state,
    status: 'error' as LoadingStatus,
    error,
  })),

  //Delete folder
  on(FoldersActions.deleteFolder, (state) => ({
    ...state,
    status: 'loading' as LoadingStatus,
  })),
  on(FoldersActions.deleteFolderSuccess, (state, { id }) => ({
    ...state,
    folders: state.folders.filter((folder) => folder.id !== Number(id)),
    status: 'loaded' as LoadingStatus,
  })),
  on(FoldersActions.deleteFolderFailure, (state, { error }) => ({
    ...state,
    status: 'error' as LoadingStatus,
    error,
  })),

  //Materials
  //Load materials
  on(MaterialsActions.loadMaterials, (state) => ({
    ...state,
    status: 'loading' as LoadingStatus,
  })),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => ({
    ...state,
    materials,
    status: 'loaded' as LoadingStatus,
  })),
  on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
    ...state,
    status: 'error' as LoadingStatus,
    error,
  })),

  //Create material
  on(MaterialsActions.createMaterial, (state) => ({
    ...state,
    status: 'loading' as LoadingStatus,
  })),
  on(MaterialsActions.createMaterialSuccess, (state, { material }) => ({
    ...state,
    materials: [...state.materials, material],
    status: 'loaded' as LoadingStatus,
  })),
  on(MaterialsActions.createMaterialFailure, (state, { error }) => ({
    ...state,
    status: 'error' as LoadingStatus,
    error,
  })),

  //Delete material
  on(MaterialsActions.deleteMaterial, (state) => ({
    ...state,
    status: 'loading' as LoadingStatus,
  })),
  on(MaterialsActions.deleteMaterialSuccess, (state, { id }) => ({
    ...state,
    materials: state.materials.filter((material) => material.id !== Number(id)),
    status: 'loaded' as LoadingStatus,
  })),
  on(MaterialsActions.deleteMaterialFailure, (state, { error }) => ({
    ...state,
    status: 'error' as LoadingStatus,
    error,
  }))
);

export const materialsFeature = createFeature({
  //selectFolders, selectMaterials, selectStatus, selectMaterialsState
  name: materialsFeatureKey,
  reducer,
});
