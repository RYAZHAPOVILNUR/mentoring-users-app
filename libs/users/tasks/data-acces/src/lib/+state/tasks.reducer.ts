import { ITask, ITaskColum } from '../model/task.interface';
import { createReducer, on } from '@ngrx/store';
import { tasksAction } from './tasks.action';


export const initialState: ITaskColum = {
  id: 0,
  created_at: 0,
  email: '',
  authorId: 0,
  column: {
    columnName: '',
    tasks: {
        taskName: ''
    },
  },
};
export const tasksReducer = createReducer(
    initialState,
  on(tasksAction.getColumn, state => ({
    ...state
  })),
  on(tasksAction.getColumnSuccess, (state, { res }) => ({
    ...state,
    column: { ...res.column }
  }))
);
