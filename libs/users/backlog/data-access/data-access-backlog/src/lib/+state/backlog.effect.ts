import { inject } from '@angular/core';
import { ApiService } from '@core/data-access-api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Backlog } from '@users/shared/data-access-models';
import { catchError, map, of, switchMap } from 'rxjs';

import { backlogAction } from './backlog.action';
import { CreateBacklog } from '../interfaces/create-backlog.interface';

export const addBacklogTask$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(backlogAction.addBacklog),
      switchMap(({ backlogData }) =>
        apiService.post<Backlog, CreateBacklog>('/backlog', backlogData).pipe(
          map((backlogEntity) => backlogAction.addBacklogSuccess({ backlogData: backlogEntity })),
          catchError((error) => {
            return of(error);
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const loadBacklogs$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(backlogAction.loadBacklog),
      switchMap(() =>
        apiService.get<Backlog[]>('/backlog').pipe(
          map((backlogs) => {
            return backlogAction.loadBacklogSuccess({ backlogs });
          }),
          catchError((error) => {
            console.error('Error', error);
            return of(error);
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const deleteBacklog$ = createEffect(
  () => {
    const actions = inject(Actions);
    const apiService = inject(ApiService);

    return actions.pipe(
      ofType(backlogAction.deleteBacklog),
      switchMap(({ id }) =>
        apiService.delete<void>(`/backlog/${id}`).pipe(
          map(() => backlogAction.deleteBacklogSuccess({ id })),
          catchError((error) => {
            console.log(error);
            return of(error);
          }),
        ),
      ),
    );
  },
  { functional: true },
);
