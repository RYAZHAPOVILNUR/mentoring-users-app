import { tap } from 'rxjs';
import { IColumn } from './../model/tasks.interface';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { tasksAction } from './tasks.action';
import { ITaskBoard } from '../model/tasks.interface';
import { EMPTY } from 'rxjs';

export class tasksEffects {
  // loadAllBoards$ = createEffect(() => {
  //   const actions$ = inject(Actions);
  //   const api = inject(ApiService);
  //   return actions$.pipe(
  //     ofType(tasksAction.loadBoards),
  //     mergeMap(() =>
  //       api.get<{boards: ITaskBoard[]}>('/todos').pipe(
  //         map((res) => {
  //           return tasksAction.loadBoardsSuccess({ boards: res.boards });
  //         }),
  //         tap((res) => console.log('я из /todos', res))
  //       ))
  //   );
  // });

  loadMyBoards$ = createEffect(() => {
    const actions$ = inject(Actions);
    const api = inject(ApiService);
    return actions$.pipe(
      ofType(tasksAction.loadMyBoard),
      mergeMap(() =>
        api.get<ITaskBoard>('/todos/me').pipe(
          tap((res) => console.log('я из /todos/me', res)),
          map((res) => tasksAction.loadMyBoardSuccess({ board: res }))
        )
      )
    );
  });

  deleteColumn$ = createEffect(() => {
    const actions$ = inject(Actions);
    const api = inject(ApiService);
    return actions$.pipe(
      ofType(tasksAction.deleteColumn),
      mergeMap(({ columnIndex }) =>
        api
          .delete(`/todos/${columnIndex}`)
          .pipe(map(() => tasksAction.deleteColumnSuccess({ columnIndex })))
      )
    );
  });

  updateColumnsEffect$ = createEffect(() => {
    const actions$ = inject(Actions);
    const api = inject(ApiService);
    return actions$.pipe(
      ofType(tasksAction.updateColumns),
      mergeMap((action) =>
        api.post<{columns: IColumn[]}, {columns: IColumn[]}>('/todos/change', { columns: action.columns }).pipe(
          map((response) => tasksAction.updateColumnsSuccess({ columns: response.columns })),
          catchError(() => EMPTY)
        )
      )
    );
  });
}
