import { Action, createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { FolderDTO, MaterialDTO } from '../models/types';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export const MATERIALS_FEATURE_KEY = 'materials';
export type MaterialsStatus = 'init' | 'loading' | 'loaded';

export interface MaterialsFeatureState extends EntityState<FolderDTO> {
  materials: MaterialDTO[],
  status: MaterialsStatus,
  error: string
}

export const materialAdapter: EntityAdapter<FolderDTO> = createEntityAdapter<FolderDTO>();

export const initialMaterialsState: MaterialsFeatureState = materialAdapter.getInitialState({
  materials: [],
  status: 'init',
  error: ''
});

export const materialFeature = createFeature({
  name: 'materials',
  reducer: createReducer(
    initialMaterialsState,
    on(MaterialsActions.loadFolders, state => ({
      ...state,
      status: 'loading' as const,
    })),
    on(MaterialsActions.loadFoldersSuccess, (state, { folders }) =>
      materialAdapter.setAll(folders, {
        ...state,
        status: 'loaded' as const
      })
    ),
    on(MaterialsActions.loadFoldesFailure, (state, { error }) => ({
      ...state,
      error: error,
    })),
    on(MaterialsActions.addFolderSuccess, (state, { newFolder }) =>
      materialAdapter.addOne(newFolder, { ...state })
    ),
    on(MaterialsActions.addFolderFailure, (state, { error }) => ({
      ...state,
      error: error,
    })),
    on(MaterialsActions.deleteFolderSuccess, (state, { id }) =>
      materialAdapter.removeOne(id, { ...state })
    ),
    on(MaterialsActions.deleteFolderFailure, (state, { error }) => ({
      ...state,
      error: error,
    })),
    on(MaterialsActions.openFolderSuccess, (state, { folder }) =>
      materialAdapter.addOne({ ...folder }, {
        ...state,
        status: 'loaded' as const
      })
    ),
    on(MaterialsActions.openFolderFailure, (state, { error }) => ({
      ...state,
      error: error,
    })),
    on(MaterialsActions.loadMaterials, state => ({
      ...state,
      status: 'loaded' as const,
    })),
    on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => ({
      ...state,
      materials: materials,
      status: 'loaded' as const,
    })),
    on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
      ...state,
      error: error,
    })),
    on(MaterialsActions.addMaterialSuccess, (state, { newMaterial }) => ({
      ...state,
      materials: [...state.materials, newMaterial],
    })),
    on(MaterialsActions.addMaterualFailure, (state, { error }) => ({
      ...state,
      error: error,
    })),
    on(MaterialsActions.deleteMaterialSuccess, (state, { id }) => ({
      ...state,
      materials: state.materials.filter(material => material.id !== id),
    })),
    on(MaterialsActions.deleteMaterialFailure, (state, { error }) => ({
      ...state,
      error: error,
    })),
  )
})

