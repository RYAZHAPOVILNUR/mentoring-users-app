import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { ApiService } from '@users/core/http';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@users/core/data-access';

@Injectable()
// export class MaterialsEffects {
//   loadMaterialss$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(MaterialsActions.loadMaterialss),
//       concatMap(() =>
//         /** An EMPTY observable only emits completion. Replace with your own observable API request */
//         EMPTY.pipe(
//           map((data) => MaterialsActions.loadMaterialssSuccess({ data })),
//           catchError((error) => of(MaterialsActions.loadMaterialssFailure({ error })))
//         )
//       )
//     );
//   });

//   constructor(private actions$: Actions) {}
// }

export const loadFolder = createEffect(
    () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);
    return actions$.pipe(
      ofType(MaterialsActions.loadMaterialss),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) => {
        if (params['id']) {
          return apiService.get<>
        }
      })
    )
}
)
