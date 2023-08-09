import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ApiService } from '@users/core/http';
import { ITaskColum } from '../model/task.interface';
import { tap, map, switchMap } from 'rxjs/operators'; 
import { tasksAction } from './tasks.action';
import { Store } from '@ngrx/store';

export class TasksEffects {
  getColumn$ = createEffect(() => {
    const actions$ = inject(Actions);
    const api = inject(ApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(tasksAction.getColumn),
      switchMap(() =>
        api.get<ITaskColum>('/todos/me').pipe( 
          tap((res) => console.log('res', res)),
          map((res) => tasksAction.getColumnSuccess({ res }))
        )
      )
    );
  });
}
