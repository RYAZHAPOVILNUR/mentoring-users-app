import { createActionGroup, props, emptyProps } from "@ngrx/store";
import { Article } from "@users/users/articles/data-access";
import { IBacklog } from "../model/backlog.model";

export const backlogAction = createActionGroup({
  source: 'backlog',
  events: {
    loadBacklog: emptyProps(),
    loadBacklogSuccess: props<{ backlogs: IBacklog[] }>(),
    deleteBacklog: props<{ id: number }>(),
    deleteBacklogSuccess: props<{ id: number }>(),
    // loadBacklogSuccess: ,
    // loadBacklogSuccess: props<{ boards: ITaskBoard[] }>(),
    // loadBacklogSuccess: props<{ boards: ITaskBoard[] }>(),

    // loadMyBoard: emptyProps(),
    // loadMyBoardSuccess: props<{ board: ITaskBoard }>(),
    //
    // addBoard: props<ITaskBoard>(),
    // addBoardSuccess: props<ITaskBoard>(),
    //
    // updateColumns: props<{columns: IColumn[]}>(),
    // updateColumnsSuccess: props<{columns: IColumn[]}>(),
    //
    // deleteColumn: props<{ columnIndex: number }>(),
    // deleteColumnSuccess: props<{ columnIndex: number }>(),
    //
    // searchTask: props<{term: string}>(),
  }
});
