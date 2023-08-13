
import { createActionGroup, props, emptyProps } from "@ngrx/store";
import { IColumn, ITaskBoard } from "../model/tasks.interface";

export const tasksAction = createActionGroup({
    source: 'tasks',
    events:{
      getTasksColumn: emptyProps(),
      getColumnSuccess: props<ITaskBoard>(),
      postChangeColumns: props<{columns: IColumn[]}>(),
      postChangeColumnsSuccess: props<{columns: IColumn[]}>(),
      moveTask: props<{ columns: IColumn[] }>(),  
    }
  });