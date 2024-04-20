import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { IFolder } from '../models/folder.model';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { IMaterial } from '../models/material.model';
import { LoadingStatus } from '@users/core/data-access';

export const MATERIALS_FEATURE_KEY = 'materials';

export interface MaterialsState extends EntityState<IFolder> {
  material: IMaterial[];
  status: LoadingStatus;
}
export const materialsAdapter: EntityAdapter<IFolder> = createEntityAdapter<IFolder>();

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  material: [],
  status: 'init',
});

export const materialsFeature = createFeature({
  name: 'materials',
  reducer: createReducer(
    initialMaterialsState,
    on(MaterialsActions.addFolderSuccess, (state, { folder }) => materialsAdapter.addOne(folder, { ...state })),
    on(MaterialsActions.addFolderFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    })),
    on(MaterialsActions.loadFolders, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(MaterialsActions.loadFoldersSuccess, (state, { folders }) =>
      materialsAdapter.setAll(folders, { ...state, status: 'loaded' as const })
    ),
    on(MaterialsActions.loadFoldersFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    })),
    on(MaterialsActions.deleteFoldersSuccess, (state, { id }) => materialsAdapter.removeOne(id, { ...state })),
    on(MaterialsActions.deleteFoldersFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    })),
    on(MaterialsActions.openFolder, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(MaterialsActions.openFolderSuccess, (state, { folder }) =>
      materialsAdapter.addOne({ ...folder }, { ...state, status: 'loaded' as const })
    ),
    on(MaterialsActions.openFolderFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    })),

    on(MaterialsActions.loadMaterials, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(MaterialsActions.loadMaterialsSuccess, (state, { material }) => ({
      ...state,
      material,
      status: 'loaded' as const,
    })),
    on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    })),

    on(MaterialsActions.deleteMaterialsSuccess, (state, { id }) => materialsAdapter.removeOne(id, { ...state })),
    on(MaterialsActions.deleteMaterialsFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    })),

    on(MaterialsActions.addMaterialsSuccess, (state, { material }) => ({
      ...state,
      materials: [...state.material, material],
    })),

    on(MaterialsActions.addMaterialsFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    }))
  ),
});
