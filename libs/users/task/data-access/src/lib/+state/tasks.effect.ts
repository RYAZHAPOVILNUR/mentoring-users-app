import { IColumn } from './../model/tasks.interface';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ApiService } from '@users/core/http';
import { tap, map, switchMap, mergeMap } from 'rxjs/operators'; 
import { tasksAction } from './tasks.action';
import { Store } from '@ngrx/store';
import { ITaskBoard } from '../model/tasks.interface';

export class tasksEffects {
  
  getColumn$ = createEffect(() => {
    const actions$ = inject(Actions);
    const api = inject(ApiService);
    

    return actions$.pipe(
      ofType(tasksAction.getTasksColumn),
      mergeMap(() =>
        api.get<ITaskBoard>('/todos/me').pipe(
          tap((res) => console.log('res', res)),
          map((res) => tasksAction.getColumnSuccess(res))
          ))
    );
  });

  postColumn$ = createEffect(() =>{
    const actions$ = inject(Actions);
    const api = inject(ApiService);
    return actions$.pipe(
      ofType(tasksAction.postChangeColumns),
      mergeMap(({columns})=>
      api.post<void, IColumn[]>('/todos/change', columns).pipe(
        map(() => tasksAction.postChangeColumnsSuccess({columns}))
      ))
    )
  })
  }