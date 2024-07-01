import { createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { materialsActions } from './materials.actions';
import { MaterialEntity } from '../../interfaces/material-entity.interface';

export const MATERIALS_FEATURE_KEY = 'materials';
export const materialsSelector = createEntityAdapter<MaterialEntity>();

const initialMaterialState = materialsSelector.getInitialState({
  status: 'init'
});

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: createReducer(
    initialMaterialState,
    
    on(materialsActions.loadMaterials, (state) => ({
        ...state,
        status: state.status === 'init' ? 'init' : 'loading'
      })
    ),

    on(materialsActions.loadMaterialsSuccess, (state, { materials }) =>
      materialsSelector.setAll(materials, {
        ...state,
        status: 'loaded'
      })
    ),
    on(materialsActions.loadMaterialsFailure, (state) => ({
        ...state,
        status: 'error'
      })
    ),
    on(materialsActions.createMaterialSuccess, (state, { material }) =>
      materialsSelector.addOne(
        { ...material },
        { ...state }
      )
    ),
    on(materialsActions.deleteMaterialSuccess, (state, { id }) =>
      materialsSelector.removeOne(id, { ...state })
    )
  )
});
