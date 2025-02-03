import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { LoadingStatus } from '@users/core/data-access';
import * as MaterialsActions from '../+state/materials.actions';
import { IFolder } from '../models/folder.model';
import { IMaterial } from '../models/materials.model';

export const MATERIALS_FEATURE_KEY = 'materials';

export type FoldersErrors = {
  status: number;
  [key: string]: unknown;
};

export interface MaterialsState extends EntityState<IFolder> {
  materials: IMaterial[];
  selectedId?: string | number;
  status: LoadingStatus;
  error: FoldersErrors | null;
}

export const materialsAdapter: EntityAdapter<IFolder> = createEntityAdapter<IFolder>();

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  materials: [],
  status: 'init',
  error: null,
});

export interface MaterialsPartialState {
  readonly [MATERIALS_FEATURE_KEY]: MaterialsState;
}

export const reducer = createReducer(
  initialMaterialsState,
  on(MaterialsActions.initFolders, (state) => ({ ...state, status: 'loading' as const })),
  on(MaterialsActions.loadFoldersSuccess, (state, { folders }) =>
    materialsAdapter.setAll(folders, { ...state, status: 'loaded' as const })
  ),
  on(MaterialsActions.loadFoldersFailed, (state, { error }) => ({ ...state, status: 'error' as const, error })),
  on(MaterialsActions.addFolderSuccess, (state, { folder }) =>
    materialsAdapter.addOne({ ...folder }, { ...state, status: 'loaded' as const })
  ),
  on(MaterialsActions.addFolderFailed, (state, { error }) => ({ ...state, status: 'error' as const, error })),
  on(MaterialsActions.deleteFolderSuccess, (state, { id }) => materialsAdapter.removeOne(id, { ...state })),
  on(MaterialsActions.deleteFolderFailed, (state, { error }) => ({ ...state, status: 'error' as const, error })),
  on(MaterialsActions.loadFolder, (state) => ({ ...state, status: 'loading' as const })),
  on(MaterialsActions.loadFolderSuccess, (state, { folder }) =>
    materialsAdapter.addOne({ ...folder }, { ...state, status: 'loaded' as const })
  ),
  on(MaterialsActions.loadFolderFailed, (state, { error }) => ({ ...state, status: 'error' as const, error })),
  on(MaterialsActions.initMaterials, (state) => ({ ...state, status: 'loading' as const })),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => ({
    ...state,
    materials,
    status: 'loaded' as const,
  })),
  on(MaterialsActions.loadMaterialsFailed, (state, { error }) => ({ ...state, status: 'error' as const, error })),
  on(MaterialsActions.addMaterialSuccess, (state, { material }) => ({
    ...state,
    materials: [...state.materials, material],
    status: 'loaded' as const,
  })),
  on(MaterialsActions.addMaterialFailed, (state, { error }) => ({ ...state, status: 'error' as const, error })),
  on(MaterialsActions.deleteMaterialSuccess, (state, { id }) => ({
    ...state,
    materials: state.materials.filter((material) => material.id !== id),
    status: 'loaded' as const,
  })),
  on(MaterialsActions.deleteMaterialFailed, (state, { error }) => ({ ...state, status: 'error' as const, error }))
);

export function materialsReducer(state: MaterialsState | undefined, action: Action) {
  return reducer(state, action);
}
