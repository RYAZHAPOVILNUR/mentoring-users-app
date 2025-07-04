import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { ApiService } from '@core/data-access-api';

import { backlogAction } from './backlog.action';
import { CreateBacklog, IBacklog } from '../model/backlog.model';

export const addBacklogTask$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(backlogAction.addBacklog),
      switchMap(({ backlogData }) =>
        apiService.post<IBacklog, CreateBacklog>('/backlog', backlogData).pipe(
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
        apiService.get<IBacklog[]>('/backlog').pipe(
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
