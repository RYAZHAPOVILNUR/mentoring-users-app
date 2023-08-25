
import { createActionGroup, props, emptyProps } from "@ngrx/store";
import { IColumn, ITask, ITaskBoard } from "../model/tasks.interface";

export const tasksAction = createActionGroup({
    source: 'tasks',
    events:{

      //Новые action  получить, добавить, изменить , удалить
      loadBoard: emptyProps(),
      loadBoardSuccess: props<ITaskBoard>(),

      postBoard: props<{board: ITaskBoard[]}>(),
      postBoardSuccess: props<{board: ITaskBoard[]}>(),

      changeBoard: props<({columnName: string,  columnId: number, taskName: string, columns: IColumn[], tasks: ITask[]})>(),
      changeBoardSuccess: props<({columnName: string,  columnId: number, taskName: string, columns: IColumn[], tasks: ITask[]})>(),

      deleteBoard: props<({columnId: number, taskName: string})>(),
      deleteBoardSuccess: props<({columnId: number, taskName: string})>(),



      //старые action
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