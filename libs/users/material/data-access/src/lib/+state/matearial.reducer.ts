import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { Errors, LoadingStatus } from '@users/core/data-access';
import { Folder, Material } from '../model/material.interface';
import * as MaterialAction from './matearial.action';

export const MATERIAL_FEATURE_KEY = 'material';

export interface MaterialState extends EntityState<Folder> {
  selectedId?: string | number;
  material: Material[];
  status: LoadingStatus;
  error: Errors | null;
}

export interface UsersPartialState {
  readonly [MATERIAL_FEATURE_KEY]: MaterialState;
}

export const materialAdapter: EntityAdapter<Folder> = createEntityAdapter<Folder>();

export const initialMaterialState: MaterialState = materialAdapter.getInitialState({
  material: [],
  status: 'init',
  error: null,
});

const reducer = createReducer(
  initialMaterialState,
  on(MaterialAction.initFolders, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(MaterialAction.loadFoldersSuccess, (state, { folders }) =>
    materialAdapter.setAll(folders, { ...state, status: 'loaded' as const })
  ),

  on(MaterialAction.loadFolderFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

  on(MaterialAction.loadMaterialSuccess, (state, { materials }) => ({
    ...state,
    material: materials,
  })),

  on(MaterialAction.loadSelectMaterial, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),

  on(MaterialAction.deleteFolderSuccess, (state, { id }) => materialAdapter.removeOne(id, { ...state })),

  on(MaterialAction.deleteFolderFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

  on(MaterialAction.deleteMaterialSuccess, (state, { id }) => ({
    ...state,
    material: state.material.filter((material) => material.id !== id),
  })),

  on(MaterialAction.deleteMaterialFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

  on(MaterialAction.createFolderSuccess, (state, { newFolder }) =>
    materialAdapter.addOne({ ...newFolder }, { ...state })
  ),

  on(MaterialAction.createFolderFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

  on(MaterialAction.createMaterialSuccess, (state, { newMaterial }) => ({
    ...state,
    material: [...state.material, newMaterial],
  })),

  on(MaterialAction.createMaterialFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  }))
);

export function materialReducer(state: MaterialState | undefined, action: Action) {
  return reducer(state, action);
}
