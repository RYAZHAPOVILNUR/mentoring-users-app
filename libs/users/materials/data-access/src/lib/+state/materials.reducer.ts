import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';

export const materialsFeatureKey = 'materials';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(MaterialsActions.loadMaterialss, state => state),
  on(MaterialsActions.loadMaterialssSuccess, (state, action) => state),
  on(MaterialsActions.loadMaterialssFailure, (state, action) => state),
);

export const materialsFeature = createFeature({
  name: materialsFeatureKey,
  reducer,
});

