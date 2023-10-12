import { createActionGroup, props, emptyProps, createAction } from "@ngrx/store";
import { Article } from "@users/users/articles/data-access";
import { CreateBacklog, IBacklog } from "../model/backlog.model";
import { CreateUserDTO, UsersEntity } from "@users/core/data-access";

export const backlogAction = createActionGroup({
  source: 'backlog',
  events: {
    loadBacklog: emptyProps(),
    loadBacklogSuccess: props<{ backlogs: IBacklog[] }>(),
    deleteBacklog: props<{ id: number }>(),
    deleteBacklogSuccess: props<{ id: number }>(),
    addBacklog: props<{ backlogData: CreateBacklog }>(),
    addBacklogSuccess: props<{ backlogData: IBacklog }>()

    //
    // export const addUser = createAction('[Users Page] Add User', props<{ userData: CreateUserDTO }>());
    // export const addUserSuccess = createAction('[Users/Api] Add User Success', props<{ userData: UsersEntity }>());
    // export const addUserFailed = createAction('[Users/Api] Add User Failed', props<{ error: any }>());

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
