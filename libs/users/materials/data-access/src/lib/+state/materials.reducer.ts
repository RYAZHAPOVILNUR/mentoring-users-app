import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { LoadingStatus } from '@users/core/data-access';
import { Folder } from '../models/folder.model';
import { Material } from '../models/material.model';

export const materialsFeatureKey = 'materials';

export interface MaterialsState extends EntityState<Folder> {
  materials: Material[];
  status: LoadingStatus;
}

export const materialsAdapter: EntityAdapter<Folder> = createEntityAdapter<Folder>();

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  materials: [],
  status: 'init',
});

export const reducer = createReducer(
  initialMaterialsState,
  on(MaterialsActions.loadFolders, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.loadFoldersSuccess, (state, { folders }) =>
    materialsAdapter.setAll(folders, {
      ...state,
      status: 'loaded' as const,
    })
  ),
  on(MaterialsActions.loadFoldersFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(MaterialsActions.loadFolder, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.loadFolderSuccess, (state, { folder }) =>
    materialsAdapter.upsertOne(folder, {
      ...state,
      status: 'loaded' as const,
    })
  ),
  on(MaterialsActions.loadFolderFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(MaterialsActions.addFolderSuccess, (state, { folder }) =>
    materialsAdapter.addOne(folder, {
      ...state,
    })
  ),
  on(MaterialsActions.addFolderFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(MaterialsActions.deleteFolderSuccess, (state, { id }) =>
    materialsAdapter.removeOne(id, {
      ...state,
    })
  ),
  on(MaterialsActions.deleteFolderFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(MaterialsActions.loadMaterials, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => ({
    ...state,
    materials,
    status: 'loaded' as const,
  })),
  on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(MaterialsActions.addMaterialSuccess, (state, { material }) => ({
    ...state,
    materials: [...state.materials, material],
  })),
  on(MaterialsActions.addMaterialFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(MaterialsActions.deleteMaterialSuccess, (state, { id }) => ({
    ...state,
    materials: state.materials.filter((material) => material.id !== id),
  })),
  on(MaterialsActions.deleteMaterialFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  }))
);

export const materialsFeature = createFeature({
  name: materialsFeatureKey,
  reducer,
});
