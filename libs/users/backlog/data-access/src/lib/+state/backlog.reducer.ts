import { createFeature, createReducer, on } from '@ngrx/store';
import { IBacklog } from "../model/backlog.model";
import { backlogAction } from "./backlog.action";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { LoadingStatus } from "@users/core/data-access";


export const BACKLOG_FEATURE_KEY = 'backlogs';

export interface BacklogsState extends EntityState<IBacklog> {
  status: LoadingStatus
}

export const backlogsAdapter: EntityAdapter<IBacklog> = createEntityAdapter<IBacklog>();

export const initialBacklogsState: BacklogsState = backlogsAdapter.getInitialState({
  status: 'init'
})

export const backlogFeature = createFeature({
  name: BACKLOG_FEATURE_KEY,
  reducer: createReducer(
    initialBacklogsState,
    on(backlogAction.loadBacklog, (state) => {
      return {
        ...state,
        status: 'loading' as const
      };
    }),
    on(backlogAction.loadBacklogSuccess, (state, { backlogs }) => {
      return backlogsAdapter.setAll(backlogs, { ...state, status: 'loaded' as const })
    }),
    on(backlogAction.deleteBacklogSuccess, (state, { id }) =>
      backlogsAdapter.removeOne(id, { ...state })
    )
  ),
});
