import { createReducer, on, createFeature } from '@ngrx/store';
import { tasksAction } from './tasks.action';
import { ITaskBoard } from '../model/tasks.interface';

export const TASKS_FEATURE_KEY = 'tasks';

export const tasksInitialState: ITaskBoard = {
  id: 0,
  created_at: 0,
  email: '',
  authorId: 0,
  columns: [],
};

export const tasksFeature = createFeature({
  name: TASKS_FEATURE_KEY,
  reducer: createReducer(
    tasksInitialState,
    on(tasksAction.getTasksColumn, (state) => ({
      ...state,
    })),
    on(tasksAction.getColumnSuccess, (state, action) => ({
      ...state,
      ...action,
    })),
    on(tasksAction.postChangeColumnsSuccess, (state, action) => ({
      ...state,
      columns: action.columns,
    })),

    on(tasksAction.moveTask, (state, action) => ({
      ...state,
      columns: action.columns,
    })),
    on(tasksAction.deleteColumnTask, (state, { columnIndex }) => {
      console.log("Deleting column at index", columnIndex);
      return {
        ...state,
        columns: state.columns.filter((_, index) => index !== columnIndex),
      };
    })
  ),
});
