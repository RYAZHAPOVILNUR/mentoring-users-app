
import { createActionGroup, props, emptyProps } from "@ngrx/store";
import { IColumn, ITaskBoard } from "../model/tasks.interface";

export const tasksAction = createActionGroup({
  source: 'tasks',
  events:{
    loadBoards: emptyProps(),
    loadBoardsSuccess: props<{ boards: ITaskBoard[] }>(),

    loadMyBoard: emptyProps(),
    loadMyBoardSuccess: props<{ board: ITaskBoard }>(),
    

    addBoard: props<ITaskBoard>(),
    addBoardSuccess: props<ITaskBoard>(),

    updateColumns: props<{columns: IColumn[]}>(),
    updateColumnsSuccess: props<{columns: IColumn[]}>(),

    deleteColumn: props<{ columnIndex: number }>(),
    deleteColumnSuccess: props<{ columnIndex: number }>(), 
  }
});