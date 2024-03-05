import { createFeature, createReducer, on } from '@ngrx/store';
import * as MaterialActions from './materials.actions';
import { IFolder } from '../model/material-models';
import { LoadingStatus } from '@users/core/data-access';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export const materialsFeatureKey = 'materials';

export interface MaterialsState extends EntityState<IFolder> {
  status: LoadingStatus
}

export const materialsAdapter: EntityAdapter<IFolder> =
  createEntityAdapter<IFolder>();

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
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
    on(MaterialActions.loadFoldersFailed, (state) => ({
      ...state,
      status: 'error' as const
    })),
  )
});
