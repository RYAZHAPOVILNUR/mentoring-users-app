import { createReducer, on } from '@ngrx/store';
import { ArticlesActions } from './articles.actions';

export const articlesFeatureKey = 'articles';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
);

