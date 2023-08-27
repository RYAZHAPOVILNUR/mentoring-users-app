import { tap } from 'rxjs';
import { IColumn } from './../model/tasks.interface';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@users/core/http';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { tasksAction } from './tasks.action';
import { Store } from '@ngrx/store';
import { ITaskBoard } from '../model/tasks.interface';
import { EMPTY } from 'rxjs';

export class tasksEffects {
  
  // loadAllBoards$ = createEffect(() => {
  //   const actions$ = inject(Actions);
  //   const api = inject(ApiService);
  //   return actions$.pipe(
  //     ofType(tasksAction.loadBoards),
  //     mergeMap(() =>
  //       api.get<ITaskBoard>('/todos').pipe(
  //         map((res) => tasksAction.loadBoardsSuccess(res)),
  //         tap((res) => console.log('я из /todos',res))
  //         ))
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
          map((res) => tasksAction.loadMyBoardSuccess(res)),
          
          ))
    );
  });

  deleteColumn$ = createEffect(() => {
      

    const actions$ = inject(Actions);
    const api = inject(ApiService);
    return actions$.pipe(
      ofType(tasksAction.deleteColumn),
      mergeMap(({ columnIndex }) =>
        api.delete(`/todos/${columnIndex}`).pipe( 
          map(() => tasksAction.deleteColumnSuccess({ columnIndex })),
        ))
    );
  });

  updateColumn$ = createEffect(() => {
    const actions$ = inject(Actions);
    const api = inject(ApiService);
    actions$.pipe(tap(action => console.log('Received action:', action)))
    return actions$.pipe(
      ofType(tasksAction.updateColumns),
      mergeMap(({ columns }) => {
        console.log('Sending columns:', columns);
        return api.post<void, { columns: IColumn[] }>('/todos/change', { columns }).pipe(
          map(() => tasksAction.updateColumnsSuccess({ columns })), 
          catchError(() => {
            console.log('Error in updateColumn$ effect');
            return EMPTY;
          })
        );
      })
    );
  });
}
