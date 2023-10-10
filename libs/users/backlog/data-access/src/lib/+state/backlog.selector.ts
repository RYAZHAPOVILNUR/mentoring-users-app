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


// export const selectUsersState =
//   createFeatureSelector<UsersState>(USERS_FEATURE_KEY);
//
// const { selectAll, selectEntities } = usersAdapter.getSelectors();
//
// export const selectUsersStatus = createSelector(
//   selectUsersState,
//   (state: UsersState) => state.status
// );
