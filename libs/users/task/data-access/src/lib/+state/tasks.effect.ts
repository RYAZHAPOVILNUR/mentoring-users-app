import { IColumn } from './../model/tasks.interface';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ApiService } from '@users/core/http';
import { tap, map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators'; 
import { tasksAction } from './tasks.action';
import { Store } from '@ngrx/store';
import { ITaskBoard } from '../model/tasks.interface';
import { EMPTY } from 'rxjs';
import { selectColumns } from './tasks.selector';

export class tasksEffects {
  
  // getColumn$ = createEffect(() => {
  //   const actions$ = inject(Actions);
  //   const api = inject(ApiService);
  //   return actions$.pipe(
  //     ofType(tasksAction.getTasksColumn),
  //     mergeMap(() =>
  //       api.get<ITaskBoard>('/todos/me').pipe(
  //         map((res) => tasksAction.getColumnSuccess(res))
  //         ))
  //   );
  // });

  loadColumns$ = createEffect(() =>{
    const actions$ = inject(Actions);
    const api = inject(ApiService);
    return actions$.pipe(
      ofType(tasksAction.loadBoard),
      mergeMap(()=>
      api.get<ITaskBoard>('/todos/me').pipe(
        map((res)=> tasksAction.loadBoardSuccess(res))
      ))
    )
  });

  postColumn$ = createEffect(() =>{
    const actions$ = inject(Actions);
    const api = inject(ApiService);
    return actions$.pipe(
      ofType(tasksAction.postChangeColumns),
      tap((payload) => console.log('payload',payload)),
      mergeMap(({columns})=>
      api.post<void, {columns: IColumn[ ] }>('/todos/change', {columns}).pipe(
        tap(()=> console.log('columns', columns)),
        map(() => tasksAction.postChangeColumnsSuccess({columns}))
      ))
    )
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

  postChangeColumns$ = createEffect(() => {
    const actions$ = inject(Actions);
    const api = inject(ApiService);
    const store = inject(Store);
    return actions$.pipe(
      ofType(tasksAction.addColumn, tasksAction.addTask, tasksAction.deleteTask, tasksAction.moveTask),
      withLatestFrom(store.select(selectColumns)),
      mergeMap(([action, columns]) => 
        api.post<void, { columns: IColumn[] }>('/todos/change', { columns }).pipe(
          map(() => tasksAction.postChangeColumnsSuccess({ columns })), 
          catchError(() => EMPTY) 
        )
      )
    );
  })
}