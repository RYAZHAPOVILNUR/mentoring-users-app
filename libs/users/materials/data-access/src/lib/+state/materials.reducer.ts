import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';

export const materialsFeatureKey = 'materials';

export interface State {}

export const initialState: State = {};

export const reducer = createReducer(
  initialState,
  on(MaterialsActions.loadMaterials, (state) => state),
  on(MaterialsActions.loadMaterialsSuccess, (state, action) => state),
  on(MaterialsActions.loadMaterialsFailure, (state, action) => state)
);

export const materialsFeature = createFeature({
  name: materialsFeatureKey,
  reducer,
});
