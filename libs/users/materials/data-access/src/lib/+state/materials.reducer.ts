import { State, createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { MaterialsActions } from './materials.actions';
import { LoadingStatus } from '@users/core/data-access';
import { MaterialsEntity } from '../models/materials.entity';
import { MatRipple } from '@angular/material/core';
import { FolderEntity } from '../models/folders.entity';

export const MATERIALS_FEATURE_KEY = 'materials';

export type MaterialsError = {
  status: number,
  [key: string]: unknown
}

export interface MaterialsState extends EntityState<FolderEntity> {
  materials: MaterialsEntity[]
  status: LoadingStatus,
  error: MaterialsError | null 
}

export const materialsAdapter: EntityAdapter<FolderEntity> =
  createEntityAdapter<FolderEntity>();

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  materials: [],
  status: 'init',
  error: null
});

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: createReducer(
    initialMaterialsState,
    on(MaterialsActions.loadFolders, state => ({
      ...state,
      status: 'loading' as const
    })),
    on(MaterialsActions.loadFoldersSuccess, (state, {folders} )=>
      materialsAdapter.setAll(folders, {...state, status: 'loaded' as const})
    ),
    on(MaterialsActions.loadFoldersFailure, (state, {error})=> ({
      ...state,
      status: 'error' as const,
      error
    })),
    on(MaterialsActions.addFoldersSuccess, (state, { newFolder }) =>
      materialsAdapter.addOne({ ...newFolder }, { ...state })
    ),
    on(MaterialsActions.addFoldersFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error
    })),
    on(MaterialsActions.deleteMaterialss, state=>({
      ...state,
      status: 'loading' as const
    })),
    on(MaterialsActions.deleteFolderSuccess, (state, { id }) => 
      materialsAdapter.removeOne(id, {...state, status: 'loaded' as const})
    ),
    on(MaterialsActions.deleteFolderFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error
    })),

    
    //Materials
    on(MaterialsActions.loadMaterialss, state => ({
      ...state,
      status: 'loading' as const
    })),
    on(MaterialsActions.loadMaterialssSuccess, (state, { materials }) =>({
      ...state,
      materials: materials,
      status: 'loaded' as const
    })),
    on(MaterialsActions.loadMaterialssFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error
    })),
    on(MaterialsActions.addMaterialssSuccess, (state, { newMaterial }) =>({
      ...state,
      materials: [...state.materials, newMaterial],
      status: 'loaded' as const
    })),
    on(MaterialsActions.addMaterialssFailure, (state, { error }) =>({
      ...state,
      status: 'error' as const,
      error
    })),
    on(MaterialsActions.deleteMaterialssSuccess, (state, { id }) => ({
      ...state,
      materials: state.materials.filter((material)=>material.id!==id)
    })),
    on(MaterialsActions.deleteMaterialssFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error
    })),
  )
});