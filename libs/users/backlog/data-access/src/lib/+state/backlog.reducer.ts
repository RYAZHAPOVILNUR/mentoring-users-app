import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { LoadingStatus } from '@shared/util-store';

import { backlogAction } from './backlog.action';
import { IBacklog } from '../model/backlog.model';

export const BACKLOG_FEATURE_KEY = 'backlogs';

export interface BacklogsState extends EntityState<IBacklog> {
  status: LoadingStatus;
}

export const backlogsAdapter: EntityAdapter<IBacklog> = createEntityAdapter<IBacklog>();

export const initialBacklogsState: BacklogsState = backlogsAdapter.getInitialState({
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
