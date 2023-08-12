import { IColumn, ITaskBoard } from './../model/task.interface';
import { createActionGroup, props, emptyProps } from "@ngrx/store";

export const tasksAction = createActionGroup({
    source: 'tasks',
    events:{
      getTasksColumn: emptyProps(),
      getColumnSuccess: props<ITaskBoard>(),
      postChangeColumns: props<{columns: IColumn[]}>(),
      postChangeColumnsSuccess: props<{columns: IColumn[]}>(),   
    }
  });
  