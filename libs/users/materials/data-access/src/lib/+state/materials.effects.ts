import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { materialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { Folder } from '../models/folder.model';

export const initMaterials = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(materialsActions.initMaterials),
      switchMap(() =>
        apiService.get<Folder[]>('/folder').pipe(
          tap((folders) => console.log('effect, folders', folders)),
          map((folders) => materialsActions.initMaterialsSuccess({ folders })),

          catchError((error) => {
            console.error('Error', error);
            return of(materialsActions.initMaterialsFailure());
          })
        )
      )
    );
  },
  { functional: true }
);
