import { createEntityAdapter } from '@ngrx/entity';
import { MaterialDTO } from '../../interfaces/material-dto.interface';
import { createFeature, createReducer, on } from '@ngrx/store';
import { materialsActions } from './materials.actions';

export const MATERIALS_FEATURE_KEY = 'materials';
export const materialsAdapter = createEntityAdapter<MaterialDTO>();

const initialState = materialsAdapter.getInitialState({
  status: 'init'
});

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: createReducer(
    initialState,

    // on(materialsActions.loadMaterials, (state) => ({
    //     ...state,
    //     status: 'loading'
    //   })
    // ),

    on(materialsActions.loadMaterials, (state) => ({
        ...state,
        status: state.status === 'init' ? 'init' : 'loading'
      })
    ),

    on(materialsActions.loadMaterialsSuccess, (state, { materials }) =>
      materialsAdapter.setAll(materials, {
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
      materialsAdapter.addOne(
        { ...material },
        { ...state }
      )
    ),
    on(materialsActions.deleteMaterialSuccess, (state, { id }) =>
      materialsAdapter.removeOne(id, { ...state })
    )
  )
});
