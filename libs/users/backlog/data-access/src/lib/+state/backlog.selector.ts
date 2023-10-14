import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BACKLOG_FEATURE_KEY, backlogsAdapter, BacklogsState } from './backlog.reducer';

const {selectAll, selectEntities} = backlogsAdapter.getSelectors()

export const selectBacklogState =
  createFeatureSelector<BacklogsState>(BACKLOG_FEATURE_KEY);

export const selectBacklogs = createSelector(
  selectBacklogState,
  (state: BacklogsState) => selectAll(state)
);

export const selectBacklogEntities = createSelector(
  selectBacklogState,
  (state: BacklogsState) => selectEntities(state)
);
