import { createFeature, createReducer, on } from '@ngrx/store';
import * as MaterialActions from './materials.actions';
import { LoadingStatus } from '@users/core/data-access';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { FolderEntity, MaterialEntity } from '../model/material.entity';

export const materialsFeatureKey = 'materials';

export interface MaterialsState extends EntityState<FolderEntity> {
  materials: MaterialEntity[]
  status: LoadingStatus
}

export const materialsAdapter: EntityAdapter<FolderEntity> =
  createEntityAdapter<FolderEntity>();

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  materials:[] as MaterialEntity[],
  status: 'init'
});


export const materialsFeature = createFeature({
  name: materialsFeatureKey,
  reducer:createReducer(
    initialMaterialsState,
    on(MaterialActions.loadFolders, (state) => ({
      ...state,
      status: 'loading' as const
    })),
    on(MaterialActions.loadFoldersSuccess, 
      (state, { folders }) =>
        materialsAdapter.setAll(folders, 
          { ...state, 
            status: 'loaded' as const 
          })
    ),
    on(MaterialActions.loadFoldersFailed, 
      (state) => ({
        ...state,
        status: 'error' as const
      })),
    on(MaterialActions.addFolder, 
      (state) => ({
        ...state,
        status:'loading' as const
      })),
    on(MaterialActions.addFolderSuccess, 
      (state, {newFolder}) => 
        materialsAdapter.addOne(
          {...newFolder},
          {
            ...state,
            status:'loaded' as const
          })
      ),
    on(MaterialActions.addFolder, 
      (state) => ({
        ...state,
        status:'error' as const
      })),

    on(MaterialActions.deleteFolder, 
      (state) => ({
        ...state,
        status:'loading' as const
      })),
    on(MaterialActions.deleteFolderSuccess, 
      (state, {id}) => 
        materialsAdapter.removeOne(
          id,
          {
            ...state,
            status:'loaded' as const
          })
      ),
    on(MaterialActions.deleteFolderFailed, 
      (state) => ({
        ...state,
        status:'error' as const
      })),
    on(MaterialActions.loadMaterials, 
      (state) => (
        {
          ...state, 
          status:'loading' as const
        })
      ),
    on(MaterialActions.loadMaterialsSuccess, 
      (state, {materials}) => (
        {
          ...state, 
          materials, 
          status:'loaded' as const
        })
      ),
    on(MaterialActions.loadMaterialsFailed, 
      (state) => (
        {
          ...state,
          status:'error' as const
        })
      ),
    on(MaterialActions.addMaterial, (state) => ({
      ...state,
      status:'loading' as const
    })),
    on(MaterialActions.addMaterialSuccess, (state, { material }) => ({
      ...state,
      materials: [...state.materials, material],
      status: 'loaded' as const
    })),
    on(MaterialActions.addMaterialFailed, (state) => ({
      ...state,
      status: 'error' as const
    })),
    on(MaterialActions.deleteMaterial, (state) => ({
      ...state,
      status:'loading' as const
    })),
    on(MaterialActions.deleteMaterialSuccess, (state, { id }) => ({
      ...state,
      materials: state.materials.filter(material => material.id !== id),
      status: 'loaded' as const
    })),
    on(MaterialActions.deleteMaterialFailed, (state) => ({
      ...state,
      status: 'error' as const
    }))
  )
});
