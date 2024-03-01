import { createFeature, createReducer, on } from '@ngrx/store';
import * as MaterialActions from './materials.actions';
import { IMaterial } from '../model/material-models';
import { LoadingStatus } from '@users/core/data-access';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export const materialsFeatureKey = 'materials';

export interface MaterialsState extends EntityState<IMaterial> {
  status: LoadingStatus
}

export const materialsAdapter: EntityAdapter<IMaterial> =
  createEntityAdapter<IMaterial>();

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  status: 'init'
});


export const materialsFeature = createFeature({
  name: materialsFeatureKey,
  reducer:createReducer(
    initialMaterialsState,
    on(MaterialActions.loadMaterials, (state) => ({
      ...state,
      status: 'loading' as const
    })),
    on(MaterialActions.loadMaterialsSuccess, 
      (state, { materials }) =>
        materialsAdapter.setAll(materials, 
          { ...state, 
            status: 'loaded' as const 
          })
    ),
    on(MaterialActions.loadMaterialsFailed, (state) => ({
      ...state,
      status: 'error' as const
    })),
  )
});
