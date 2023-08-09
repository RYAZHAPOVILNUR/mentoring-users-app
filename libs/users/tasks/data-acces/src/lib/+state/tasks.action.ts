import { ITaskColum } from './../model/task.interface';
import { createActionGroup, props, emptyProps } from "@ngrx/store";

export const tasksAction = createActionGroup({
    source: 'tasks',
    events:{
      getColumn: emptyProps(),
      getColumnSuccess: props<{ res: ITaskColum }>() 
    }
  });
  