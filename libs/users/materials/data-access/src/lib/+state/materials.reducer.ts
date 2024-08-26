import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { LoadingStatus } from '@users/core/data-access';
import { materialsActions } from './materials.actions';
import { Folder } from '../models/folder.model';
import { MaterialVM } from '../models/material.model';

export const materialsFeatureKey = 'materials';

export interface MaterialsState extends EntityState<Folder> {
  materials: MaterialVM[];
  loadingStatus: LoadingStatus;
  error: null;
}

export const materialsAdapter: EntityAdapter<Folder> = createEntityAdapter<Folder>();

export const materialsInitialState: MaterialsState = materialsAdapter.getInitialState({
  materials: [],
  loadingStatus: 'init',
  error: null,
});

export const materialsFeature = createFeature({
  name: materialsFeatureKey,
  reducer: createReducer(
    materialsInitialState,
    on(materialsActions.loadFolders, (state) => ({ ...state, loadingStatus: 'loading' as const })),
    on(materialsActions.loadFoldersSuccess, (state, { folders }) =>
      materialsAdapter.setAll(folders, { ...state, loadingStatus: 'loaded' as const, error: null })
    ),
    on(materialsActions.loadFoldersFailure, (state, { error }) => ({
      ...state,
      loadingStatus: 'error' as const,
      error,
    })),
    on(materialsActions.addFolderSuccess, (state, { newFolder }) => materialsAdapter.addOne(newFolder, state)),
    on(materialsActions.deleteFolderSuccess, (state, { id }) => materialsAdapter.removeOne(id, state)),
    on(materialsActions.loadMaterials, (state) => ({ ...state, loadingStatus: 'loading' as const })),
    on(materialsActions.loadMaterialsSuccess, (state, { materials }) => ({
      ...state,
      materials,
      loadingStatus: 'loaded' as const,
      error: null,
    })),
    on(materialsActions.loadMaterialsFailure, (state, { error }) => ({
      ...state,
      loadingStatus: 'error' as const,
      error,
    })),
    on(materialsActions.addMaterialSuccess, (state, { material }) => ({
      ...state,
      materials: [...state.materials, material],
      loadingStatus: 'loaded' as const,
      error: null,
    })),
    on(materialsActions.deleteMaterialSuccess, (state, { id }) => {
      const materials = state.materials.filter((material) => material.id !== id);
      return {
        ...state,
        materials: [...materials],
        error: null,
      };
    }),
    on(materialsActions.loadFolder, (state) => ({ ...state, loadingStatus: 'loading' as const })),
    on(materialsActions.loadFolderSuccess, (state, { folder }) =>
      materialsAdapter.addOne(folder, { ...state, loadingStatus: 'loaded' as const, error: null })
    ),
    on(materialsActions.loadFolderFailure, (state, { error }) => ({
      ...state,
      loadingStatus: 'error' as const,
      error,
    })),
  ),
});
