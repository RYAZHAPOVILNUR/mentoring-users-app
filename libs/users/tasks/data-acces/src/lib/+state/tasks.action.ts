import { ITask, ITaskColum } from './../model/task.interface';
import { createActionGroup, props, emptyProps } from "@ngrx/store";

export const tasksAction = createActionGroup({
    source: 'tasks',
    events:{
      getTasksColumn: emptyProps(),
      getColumnSuccess: props<ITaskColum>(),
      
    }
  });
  