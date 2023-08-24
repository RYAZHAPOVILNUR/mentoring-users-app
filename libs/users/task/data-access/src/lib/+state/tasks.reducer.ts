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
    on(tasksAction.deleteColumnSuccess, (state, { columnIndex }) => ({ // Обработка успешного удаления колонны
      ...state,
      columns: [...state.columns.slice(0, columnIndex), ...state.columns.slice(columnIndex + 1)]
    })),
    on(tasksAction.addColumn, (state, { columnName }) => ({
      ...state,
      columns: [...state.columns, columnName]
    })),
    on(tasksAction.addTask, (state, { columnIndex, taskName }) => ({
      ...state,
      columns: state.columns.map((column, index) => 
        index === columnIndex ? {...column, tasks: [...column.tasks, {taskName}]} : column)
    })),
    on(tasksAction.deleteTask, (state, { columnIndex, taskIndex }) => ({
      ...state,
      columns: state.columns.map((column, index) => 
        index === columnIndex ? {...column, tasks: column.tasks.filter((_, idx) => idx !== taskIndex)} : column)
    })),
    on(tasksAction.moveTask, (state, { previousColumnIndex, currentColumnIndex, prevTaskIndex, currentTaskIndex }) => {
      const newState = JSON.parse(JSON.stringify(state));
  
      // Получаем начальный и конечный столбцы
      const startColumn = newState.columns[previousColumnIndex];
      const finishColumn = newState.columns[currentColumnIndex];
  
      // Удаляем задачу из начального столбца
      const [removed] = startColumn.tasks.splice(prevTaskIndex, 1); // Изменил taskIds на tasks
  
      // Добавляем задачу в конечный столбец
      finishColumn.tasks.splice(currentTaskIndex, 0, removed); // Изменил taskIds на tasks
  
      return newState;
    })
  ),
});


