import { createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';

export const materialsFeatureKey = 'materials';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
);

