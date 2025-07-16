import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TASKS_FEATURE_KEY } from './tasks.reducer';
import { TaskBoard } from '../interfaces/tasks.interface';

const selectTaskState = createFeatureSelector<TaskBoard>(TASKS_FEATURE_KEY);

export const selectColumns = createSelector(selectTaskState, (state: TaskBoard) => state.columns);
