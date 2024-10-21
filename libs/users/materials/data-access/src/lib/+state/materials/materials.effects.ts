import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { MaterialsDTO } from '../../models/materials-dto.model';

export const loadMaterials$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const api = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      tap(() => console.log('Effect triggered')),
      switchMap(() =>
        api.get<MaterialsDTO[]>('/material').pipe(
          tap(() => console.log('API request sent')),
          tap((materials) => console.log('effect, materials', materials)),
          map((materials) => MaterialsActions.loadMaterialsSuccess({ materials })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.loadMaterialsFailure({ error })
            );
          })
        )
      )
    );
  },
  { functional: true }
);
