import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ApiService } from '@users/core/http';
import { ITaskBoard } from '../model/task.interface';
import { tap, map, switchMap, mergeMap } from 'rxjs/operators'; 
import { tasksAction } from './tasks.action';
import { Store } from '@ngrx/store';

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

//   postColumn$ = createEffect(() => {
//     const actions$ = inject(Actions);
//     const api = inject(ApiService);
//     const store = inject(Store);

//     return actions$.pipe(
//       ofType(tasksAction.postChangeColumns),
//       mergeMap(
//         ({columns}) => api.post<void, ITaskBoard>(columns, '/todos/me' ).pipe(

//         )

//       )
//     )
// })

  }

