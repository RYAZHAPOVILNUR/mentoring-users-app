import { createFeature, createReducer, on } from '@ngrx/store';

import * as MaterialsActions from './materials.actions';
import { MaterialSchema } from './materials.models';

export const MATERIALS_FEATURE_KEY = 'materials';

export const initialMaterialsState: MaterialSchema = {
  status: 'init',
  folders: [],
  materials: [],
  error: '',
};

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: createReducer(
    initialMaterialsState,
    on(MaterialsActions.initFolders, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(MaterialsActions.loadFoldersSuccess, (state, { folders }) => ({
      ...state,
      status: 'loaded' as const,
      folders,
    })),

    on(MaterialsActions.setAddFolder, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(MaterialsActions.setAddFolderSuccess, (state, { newData }) => ({
      ...state,
      status: 'loaded' as const,
      folders: [...state.folders, newData],
    })),
    on(MaterialsActions.setAddFolderFailed, (state, { error }: any) => ({
      ...state,
      status: 'failed' as const,
      error,
    })),

    on(MaterialsActions.setDeleteFolder, (state) => ({
      ...state,
      status: 'loading' as const,
    })),

    on(MaterialsActions.setDeleteFolderSuccess, (state, { id }: any) => ({
      ...state,
      status: 'loaded' as const,
      folders: state.folders.filter((item) => item.id !== id),
    })),

    on(MaterialsActions.initMaterials, (state) => ({
      ...state,
      status: 'loading' as const,
    })),

    on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => ({
      ...state,
      status: 'loaded' as const,
      materials,
    })),

    on(MaterialsActions.setAddMaterial, (state) => ({
      ...state,
      status: 'loading' as const,
    })),

    on(MaterialsActions.setAddMaterialSuccess, (state, { data }) => ({
      ...state,
      status: 'loaded' as const,
      materials: [...state.materials, data],
    })),

    on(MaterialsActions.setDeleteMaterial, (state) => ({
      ...state,
      status: 'loading' as const,
    })),

    on(MaterialsActions.setDeleteMaterialSuccess, (state, { id }) => ({
      ...state,
      status: 'loaded' as const,
      materials: state.materials.filter((item) => item.id !== id),
    }))
  ),
});
