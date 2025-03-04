import { createReducer, on } from '@ngrx/store';
import { FoldersActions } from './folders.actions';

export const foldersFeatureKey = 'folders';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
);

