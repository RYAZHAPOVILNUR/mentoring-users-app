import { inject } from '@angular/core';
import { ApiService } from '@core/data-access-api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { tasksAction } from './tasks.action';
import { Column } from '../interfaces/column.interface';
import { TaskBoard } from '../interfaces/tasks.interface';

export class TasksEffects {
  // Загрузка всех бордв, спросить нужны ли они
  loadAllBoards$ = createEffect(() => {
    const actions$ = inject(Actions);
    const api = inject(ApiService);
    return actions$.pipe(
      ofType(tasksAction.loadBoards),
      mergeMap(() =>
        api.get<{ boards: TaskBoard[] }>('/todos').pipe(
          map((res) => {
            return tasksAction.loadBoardsSuccess({ boards: res.boards });
          }),
        ),
      ),
    );
  });

  loadMyBoards$ = createEffect(() => {
    const actions$ = inject(Actions);
    const api = inject(ApiService);
    return actions$.pipe(
      ofType(tasksAction.loadMyBoard),
      mergeMap(() =>
        api.get<TaskBoard>('/todos/me').pipe(map((res) => tasksAction.loadMyBoardSuccess({ board: res }))),
      ),
    );
  });

  deleteColumn$ = createEffect(() => {
    const actions$ = inject(Actions);
    const api = inject(ApiService);
    return actions$.pipe(
      ofType(tasksAction.deleteColumn),
      mergeMap(({ columnIndex }) =>
        api.delete(`/todos/${columnIndex}`).pipe(map(() => tasksAction.deleteColumnSuccess({ columnIndex }))),
      ),
    );
  });

  updateColumnsEffect$ = createEffect(() => {
    const actions$ = inject(Actions);
    const api = inject(ApiService);
    return actions$.pipe(
      ofType(tasksAction.updateColumns),
      switchMap((action) =>
        api.post<{ columns: Column[] }, { columns: Column[] }>('/todos/change', { columns: action.columns }).pipe(
          map((response) => tasksAction.updateColumnsSuccess({ columns: response.columns })),
          catchError(() => EMPTY),
        ),
      ),
    );
  });
}
