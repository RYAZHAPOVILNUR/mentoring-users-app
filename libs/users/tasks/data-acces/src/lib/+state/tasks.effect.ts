import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ApiService } from '@users/core/http';
import { map, switchMap } from 'rxjs/operators'; 
import { tasksAction } from './tasks.action';
import {  ITaskColum } from '../model/task.interface';

export const getColumn$ = createEffect(
    (actions$ = inject(Actions),
    api = inject(ApiService),
    store = inject(Store)) =>
    actions$.pipe(
        ofType(tasksAction.getColumn),
        switchMap(()=>
        api.get<ITaskColum>('/todos/me').pipe( 
            tap((res) => console.log('res', res)),
            map((res) =>{
                return tasksAction.getColumnSuccess({ res });
            })
        ) )
    ),
    {functional: true}
)