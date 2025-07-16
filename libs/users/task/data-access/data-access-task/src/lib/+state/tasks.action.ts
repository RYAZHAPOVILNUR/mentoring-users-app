import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Column } from '../interfaces/column.interface';
import { TaskBoard } from '../interfaces/tasks.interface';

export const tasksAction = createActionGroup({
  source: 'tasks',
  events: {
    loadBoards: emptyProps(),
    loadBoardsSuccess: props<{ boards: TaskBoard[] }>(),

    loadMyBoard: emptyProps(),
    loadMyBoardSuccess: props<{ board: TaskBoard }>(),

    addBoard: props<TaskBoard>(),
    addBoardSuccess: props<TaskBoard>(),

    updateColumns: props<{ columns: Column[] }>(),
    updateColumnsSuccess: props<{ columns: Column[] }>(),

    deleteColumn: props<{ columnIndex: number }>(),
    deleteColumnSuccess: props<{ columnIndex: number }>(),

    searchTask: props<{ term: string }>(),
  },
});
