import { ITask, ITaskColum } from './../model/task.interface';
import { createActionGroup, props, emptyProps } from "@ngrx/store";

export const tasksAction = createActionGroup({
source: 'tasks',
events:{
    getColumn: emptyProps(),
    // putColumn: props<{column: ITaskColum}>(),
    // getTask: props<{ task: ITask}>(),
    // getColumnFailure: props<{ error: Error }>(),
    getColumnSuccess: props<{ res: ITaskColum }>()
}
});