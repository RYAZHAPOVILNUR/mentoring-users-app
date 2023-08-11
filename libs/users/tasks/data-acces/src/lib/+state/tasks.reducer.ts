import { ITaskColum } from '../model/task.interface';
import { createReducer, on, createFeature } from '@ngrx/store';
import { tasksAction } from './tasks.action';
import { act } from '@ngrx/effects';



export const tasksInitialState: ITaskColum = {
  id: 0,
  created_at: 0,
  email: '',
  authorId: 0,
  column: {
    columnName: '',
    tasks: []
  }
};



export const tasksFeature = createFeature({
  name: 'tasks',
  reducer: createReducer(
    tasksInitialState,
    on(tasksAction.getTasksColumn, (state) =>({
      ...state
    })),
    on(tasksAction.getColumnSuccess, (state, action) => ({
      ...state,
      ...action
    }))
  ),
});