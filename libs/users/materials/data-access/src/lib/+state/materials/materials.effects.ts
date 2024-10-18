import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { LoadingStatus } from '../../models/loading-status.enum';
import { ApiService } from '@users/core/http';
import { IMaterial } from '../../models/material.interface';

export const loadMaterials$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const api = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      tap(() => console.log('Effect triggered')),
      switchMap(() =>
        api.get<IMaterial[]>('/material').pipe(
          tap(() => console.log('API request sent')),
          tap((materials) => console.log('effect, materials', materials)),
          map((materials) => MaterialsActions.loadMaterialsSuccess({ materials })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.loadMaterialsFailure({
              status: LoadingStatus.Error,
              error
            }));
          })
        )
      )
    );
  },
  { functional: true }
);
