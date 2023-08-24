
import { createActionGroup, props, emptyProps } from "@ngrx/store";
import { IColumn, ITaskBoard } from "../model/tasks.interface";

export const tasksAction = createActionGroup({
    source: 'tasks',
    events:{
      getTasksColumn: emptyProps(),
      getColumnSuccess: props<ITaskBoard>(),
      postChangeColumns: props<{columns: IColumn[]}>(),
      postChangeColumnsSuccess: props<{columns: IColumn[]}>(),
      deleteColumn: props<{ columnIndex: number }>(),
      deleteColumnSuccess: props<{ columnIndex: number }>(),
      addColumn: props<{ columnName: IColumn }>(),
      addTask: props<{ columnIndex: number; taskName: string }>(),
      deleteTask: props<{ columnIndex: number; taskIndex: number }>(),
      moveTask: props<{ previousColumnIndex: number, currentColumnIndex: number, prevTaskIndex: number, currentTaskIndex: number }>(),
    }
  });