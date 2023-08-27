import { createFeature, createReducer, on } from '@ngrx/store';
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
    on(tasksAction.loadBoards, (state) => ({
      ...state,
    })),
    on(tasksAction.loadBoardsSuccess, (state, action) => ({
      ...state,
      ...action,
    })),
    on(tasksAction.updateColumnsSuccess, (state, { columns }) => ({
      ...state,
      columns: [...columns]
    })),
    on(tasksAction.deleteColumnSuccess, (state, { columnIndex }) => ({
      ...state,
      columns: [...state.columns.slice(0, columnIndex), ...state.columns.slice(columnIndex + 1)]
    })),
    on(tasksAction.loadMyBoardSuccess, (state)=>({
      ...state
    }))
  ),
});