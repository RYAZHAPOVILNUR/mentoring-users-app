import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { MaterialsActions } from './materials.actions';
import { Folder } from '../models/folder.model';
import { Material } from '../models/materials.model';
import { LoadingStatus } from '@users/core/data-access';

export const MATERIALS_FEATURE_KEY = 'materials';

export type MaterialsErrors = {
  status: number,
  [key: string]: unknown;
}

export interface FolderState extends EntityState<Folder> {
  status: LoadingStatus;
  error: MaterialsErrors | null;
}

export interface MaterialState extends EntityState<Material> {
  status: LoadingStatus;
  error: MaterialsErrors | null;
}

export interface MaterialsState {
  folders: FolderState;
  materials: MaterialState;
}

export interface MaterialsPertialState {
  readonly [MATERIALS_FEATURE_KEY]: MaterialsState;
}

export const foldersAdapter: EntityAdapter<Folder> = createEntityAdapter<Folder>();
export const materialsAdapter: EntityAdapter<Material> = createEntityAdapter<Material>();

export const initialFoldersState: FolderState = foldersAdapter.getInitialState({
  status: 'init',
  error: null,
});

export const initialMaterialsState: MaterialState = materialsAdapter.getInitialState({
  status: 'init',
  error: null,
});

export const initialState: MaterialsState = {
  folders: initialFoldersState,
  materials: initialMaterialsState,
};

export const reducer = createReducer(
  initialState,
  on(MaterialsActions.loadFolders, (state) => ({
    ...state,
    folders: {
      ...state.folders,
      status: 'loading' as const,
    }
  })),
  on(MaterialsActions.loadFoldersSuccess, (state, { folders }) => ({
    ...state,
    folders: foldersAdapter.setAll(folders, {
      ...state.folders,
      status: 'loaded' as const,
    })
  })),
  on(MaterialsActions.loadFoldersFailure, (state, { error }) => ({
    ...state,
    folders: {
      ...state.folders,
      status: 'error' as const,
      error,
    }
  })),
  on(MaterialsActions.deleteFolderSuccess, (state, { id }) => ({
    ...state,
    folders: foldersAdapter.removeOne(id, { ...state.folders }),
  })),
  on(MaterialsActions.addFolderSuccess, (state, { folderData }) =>({
    ...state,
    folders: foldersAdapter.addOne(
      { ...folderData },
      { ...state.folders }
    )
  })),
  on(MaterialsActions.loadMaterials, (state) => ({
    ...state,
    materials: {
      ...state.materials,
      status: 'loading' as const
    }
  })),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => ({
    ...state,
    materials: materialsAdapter.setAll(materials, {
      ...state.materials,
      status: 'loaded' as const,
    })
  })),
  on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
    ...state,
    materials: {
      ...state.materials,
      status: 'error' as const,
      error
    }
  })),
  on(MaterialsActions.deleteMaterialSuccess, (state, { id }) => ({
    ...state,
    materials: materialsAdapter.removeOne(id, {
      ...state.materials,
    })
  })),
  on(MaterialsActions.addMaterialSuccess, (state, { materialData }) => ({
    ...state,
    materials: materialsAdapter.addOne(
      { ...materialData },
      { ...state.materials }
    )
  }))
);

export function materialsReducer(state: MaterialsState | undefined, action: Action) {
  return reducer(state, action)
}