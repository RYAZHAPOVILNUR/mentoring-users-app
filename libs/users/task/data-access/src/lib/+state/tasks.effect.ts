import { IColumn, ITask } from './../model/tasks.interface';
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
  
 private actions$ = inject(Actions);
 private api = inject(ApiService);
  //Загрузка данных из стейт
  loadColumns$ = createEffect(() =>{
    return this.actions$.pipe(
      ofType(tasksAction.loadBoard),
      mergeMap(()=>
      this.api.get<ITaskBoard>('/todos').pipe(
        map((res)=> tasksAction.loadBoardSuccess(res)),
        tap((res)=> console.log(res))
      ))
    )
  });
  // Добавление новой колонки
  postColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tasksAction.postColumn),
      mergeMap(({ columns }) => 
        this.api.post('/todos', { columns }).pipe(
          map(res => tasksAction.postColumnSuccess(res as {columns: IColumn[], email: string})),
          catchError(() => EMPTY)
        )
      )
    );
  });

// Изменение колонок
changeColumns$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(tasksAction.changeColumns),
    mergeMap(({ columns }) =>
      this.api.post('/todos/change', { columns }).pipe(
        map(res => tasksAction.changeColumnsSuccess(res as ITaskBoard)),
        catchError(() => EMPTY)
      )
    )
  );
});

// Удаление колонки
// deleteFromBoard$ = createEffect(() => {
//   return this.actions$.pipe(
//     ofType(tasksAction.deleteColumn),
//     mergeMap(({ columnIndex }) =>
//       this.api.delete(`/todos/${columnIndex}`).pipe(
//         map(() => tasksAction.deleteColumnSuccess( columnIndex )),
//         catchError(() => EMPTY)
//       )
//     )
//   );
// });
}