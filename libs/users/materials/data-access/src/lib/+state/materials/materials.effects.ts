import { inject } from '@angular/core';
import { ApiService } from '@users/core/http';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { CreateMaterialsDTO, MaterialsDTO } from '@users/core/data-access';

export const MaterialsInitEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.initMaterials),
      switchMap(() =>
        apiService.get<MaterialsDTO[]>('/material').pipe(
          map((materials) =>
            MaterialsActions.loadMaterialsSuccess({ materials })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.loadMaterialsFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

// export const CreateMaterialEffect = createEffect(
//   () => {
//     const actions$ = inject(Actions);
//     const apiService = inject(ApiService);

//     return actions$.pipe(
//       ofType(MaterialsActions.addMaterial),
//       switchMap(({ material }) =>
//         apiService
//           .post<MaterialsDTO, CreateMaterialsDTO>('/material', material)
//           .pipe(
//             map((material) =>
//               MaterialsActions.addMaterialSuccess({ material })
//             ),
//             catchError((error) => {
//               console.log('Error', error);
//               return of(MaterialsActions.addMaterialFailure({ error }));
//             })
//           )
//       )
//     );
//   },
//   { functional: true }
// );

export const RemoveMaterialEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.removeMaterial),
      switchMap(({ id }) =>
        apiService.delete<void>(`/material/${id}`).pipe(
          map(() => MaterialsActions.removeMaterialSuccess({ id })),
          catchError((error) => {
            console.log('Error', error);
            return of(MaterialsActions.removeMaterialFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
