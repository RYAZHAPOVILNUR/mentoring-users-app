import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { LoadingStatus } from '@shared/util-store';
import { Backlog } from '@users/shared/data-access-models';

import { backlogAction } from './backlog.action';

export const BACKLOG_FEATURE_KEY = 'backlogs';

export interface BacklogsState extends EntityState<Backlog> {
  status: LoadingStatus;
}

export const backlogsAdapter: EntityAdapter<Backlog> = createEntityAdapter<Backlog>();

const initialBacklogsState: BacklogsState = backlogsAdapter.getInitialState({
  status: 'init',
});

export const backlogFeature = createFeature({
  name: BACKLOG_FEATURE_KEY,
  reducer: createReducer(
    initialBacklogsState,
    on(backlogAction.loadBacklog, (state) => {
      return {
        ...state,
        status: 'loading' as const,
      };
    }),
    on(backlogAction.loadBacklogSuccess, (state, { backlogs }) => {
      return backlogsAdapter.setAll(backlogs, {
        ...state,
        status: 'loaded' as const,
      });
    }),
    on(backlogAction.deleteBacklogSuccess, (state, { id }) => backlogsAdapter.removeOne(id, { ...state })),
    on(backlogAction.addBacklogSuccess, (state, { backlogData }) =>
      backlogsAdapter.addOne({ ...backlogData }, { ...state }),
    ),
  ),
});
