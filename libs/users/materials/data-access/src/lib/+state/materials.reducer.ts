import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { Folder } from '../models/folder.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { LoadingStatus } from '@users/core/data-access';
import { Material } from '../models/material.model';

export const MATERIALS_FEATURE_KEY = 'materials';

export const foldersAdapter: EntityAdapter<Folder> = createEntityAdapter<Folder>();
export const materialsAdapter: EntityAdapter<Material> = createEntityAdapter<Material>();

export type FoldersState = EntityState<Folder>;
export type MaterialsState = EntityState<Material>;

export interface MaterialsFeatureState {
  folders: FoldersState;
  materials: MaterialsState;
  currentFolder: Folder | null;
  status: LoadingStatus;
  error: null | Error;
}

export const initialMaterialsState: MaterialsFeatureState = {
  folders: foldersAdapter.getInitialState(),
  materials: materialsAdapter.getInitialState(),
  currentFolder: null,
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
    })),

    on(MaterialsActions.currentFolderSuccess, (state, { folder }) => ({
      ...state,
      currentFolder: folder,
    })),

    on(MaterialsActions.loadMaterials, (state) => ({
      ...state,
      status: 'loading',
    })),
    on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => ({
      ...state,
      materials: materialsAdapter.setAll(materials, state.materials),
      status: 'loaded',
    })),
    on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
      ...state,
      status: 'error',
      error,
    })),

    on(MaterialsActions.addMaterialSuccess, (state, { material }) => ({
      ...state,
      materials: materialsAdapter.addOne(material, state.materials),
    }))
  ),
});
