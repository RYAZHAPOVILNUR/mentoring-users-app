import { ITaskColum } from '../model/task.interface';
import { createReducer, on } from '@ngrx/store';
import { tasksAction } from './tasks.action';


export const initialState: ITaskColum = {
  email: '',
  authorId: 0,
  column: {
    columnName: '',
    tasks: []
  }
};

export const tasksReducer = createReducer(
  initialState,
  on(tasksAction.getColumnSuccess, (state, { res }) => ({
    ...state,
    ...res
  }))
);
